using System.ComponentModel.DataAnnotations;
using Application.Contracts.Persistence;
using Application.Feature.Order.Event;
using Domain.ValueObjects;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Order.Commands;

public class PlaceOrderCommand : IRequest<Domain.Entities.Order>
{ 
    public string UserId { get; set; }
    [Required] public string City { get; set; }

    [Required] public string Street { get; set; }

    [Required] public string State { get; set; }

    [Required] public string Country { get; set; }
    [Required] public string ZipCode { get; set; }
    
    [Required] 
    [Phone]
    public string PhoneNumber { get; set; }
    public List<OrderItemRequest> OrderItems { get; set; } = new();
}

public class PlaceOrderCommandHandler(IApplicationDbContext context, IPublisher publisher)
    : IRequestHandler<PlaceOrderCommand, Domain.Entities.Order>
{
    public async Task<Domain.Entities.Order> Handle(PlaceOrderCommand request, CancellationToken cancellationToken)
    {
        var removeBasketEvent = new OrderSubmittedEvent(request.UserId, request.OrderItems);
        await publisher.Publish(removeBasketEvent, cancellationToken);
        var speakerIds = request.OrderItems.Select(x => x.SpeakerId).ToList();
        var speakers = await context.Speakers.Where(x => speakerIds.Contains(x.Id))
            .ToListAsync(cancellationToken: cancellationToken);

        var orderCode = int.Parse(DateTimeOffset.Now.ToString("ffffff"));
        var speakerDict = speakers.ToDictionary(x => x.Id, x => x);
        var confirmedOrderStockItems = new List<OrderConfirmedItem>();

        var address = new Address(request.Street, request.City, request.State, request.Country, request.ZipCode);
        var order = new Domain.Entities.Order(request.UserId, address, orderCode, request.PhoneNumber);

        foreach (var item in request.OrderItems)
        {
            var speaker = speakerDict[item.SpeakerId];
            var hasStock = speaker.UnitInStock >= item.Units;
            var confirmedBasketItem = new OrderConfirmedItem(speaker.Id, hasStock);
            confirmedOrderStockItems.Add(confirmedBasketItem);

            order.AddOrderItem(item.SpeakerId, speaker.Name, speaker.Price, 0, item.Units);
        }

        if (confirmedOrderStockItems.Any(x => !x.HasStock))
        {
            var orderStockRejectedItems = confirmedOrderStockItems
                .FindAll(c => !c.HasStock)
                .Select(c => c.ProductId)
                .ToList();
            order.SetCancelledStatusWhenStockIsRejected(orderStockRejectedItems);
        }
        else
        {
            order.SetStockConfirmedStatus();
        }

        context.Orders.Add(order);
        await context.SaveChangesAsync(cancellationToken: cancellationToken);

        return order;
    }
}

public record OrderConfirmedItem(Guid ProductId, bool HasStock);

public class OrderItemRequest
{
    [Required] public Guid SpeakerId { get; set; }

    [Required] public int Units { get; set; }
}