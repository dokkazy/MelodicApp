using Application.Feature.Order.Commands;
using MediatR;

namespace Application.Feature.Order.Event;

public record OrderSubmittedEvent(string UserId, List<OrderItemRequest> OrderItems) : INotification;