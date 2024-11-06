using Application.Contracts.Persistence;
using Application.Feature.Order.Event;
using Domain.ValueObjects;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Order.Commands;

public class PlaceOrderCommand : IRequest<Domain.Entities.Order>
{
    public string UserId { get; set; }
    public Address Address { get; private set; }
    public List<OrderItem> OrderItems { get; set; }
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

        var order = new Domain.Entities.Order(request.UserId, request.Address, orderCode);

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

public abstract class OrderItem
{
    public Guid SpeakerId { get; init; }

    public int Units { get; init; }
}