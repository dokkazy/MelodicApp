using Application.Contracts.Persistence;
using Application.Feature.Order.Event;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Speakers.EventHandling;

public class OrderPaidEventHandler(IApplicationDbContext context) : INotificationHandler<OrderPaidEvent>
{
    public async Task Handle(OrderPaidEvent @event, CancellationToken cancellationToken)
    {
        var speakerIds = @event.OrderItems.Select(x => x.SpeakerId).ToList();
        var speakers = await context.Speakers
            .Where(x => speakerIds.Contains(x.Id)).ToListAsync(cancellationToken);
        var speakerDict = @event.OrderItems.ToDictionary(x => x.SpeakerId, x => x);
        foreach (var item in speakers)
        {
            var speaker = speakerDict[item.Id];
            item.RemoveStock(speaker.Units);
            context.Speakers.Update(item);
        }

        await context.SaveChangesAsync(cancellationToken);
    }
}