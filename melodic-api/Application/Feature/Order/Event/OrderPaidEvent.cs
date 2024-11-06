using Domain.Entities;
using MediatR;

namespace Application.Feature.Order.Event;

public record OrderPaidEvent (string UserId, List<OrderItem> OrderItems) : INotification;