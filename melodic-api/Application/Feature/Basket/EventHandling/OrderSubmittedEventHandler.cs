using Application.Contracts.Persistence;
using Application.Feature.Order.Event;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Basket.EventHandling;

public class OrderSubmittedEventHandler(IApplicationDbContext context) : INotificationHandler<OrderSubmittedEvent>
{
    public async Task Handle(OrderSubmittedEvent @event, CancellationToken cancellationToken)
    {
        var basket = await context.Baskets.Include(x => x.Items)
            .SingleOrDefaultAsync(x => x.UserId == @event.UserId, cancellationToken: cancellationToken);

        if (basket is not null)
        {
            foreach (var item in @event.OrderItems)
            {
                basket.RemoveItem(item.SpeakerId, item.Units);
            }

            context.Baskets.Update(basket);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}