using System.ComponentModel.DataAnnotations;
using Domain.SeedWork;
using Domain.ValueObjects;

namespace Domain.Entities;

public class Order : Entity, IAggregateRoot
{
    public Guid? UserId { get; set; }
    public DateTime OrderDate { get; private set; }

    [Required] public Address Address { get; private set; }
    public double? Tax { get; set; }

    public OrderStatus OrderStatus { get; private set; }
    public int? PaymentId { get; private set; }

    private readonly List<OrderItem> _orderItems;

    public IReadOnlyCollection<OrderItem> OrderItems => _orderItems.AsReadOnly();


    public void AddOrderItem(Guid speakerId, string speakerName, decimal unitPrice, decimal discount, string speakerUrl,
        int units = 1)
    {
        var existingOrderForProduct = _orderItems.SingleOrDefault(o => o.SpeakerId == speakerId);

        if (existingOrderForProduct != null)
        {
            //if previous line exist modify it with higher discount  and units..
            if (discount > existingOrderForProduct.Discount)
            {
                existingOrderForProduct.SetNewDiscount(discount);
            }

            existingOrderForProduct.AddUnits(units);
        }
        else
        {
            //add validated new order item
            var orderItem = new OrderItem(speakerId, speakerName, unitPrice, discount, speakerUrl, units);
            _orderItems.Add(orderItem);
        }
    }
}

public enum OrderStatus
{
    Submitted = 1,
    StockConfirmed = 2,
    Paid = 3,
    Shipped = 4,
    Cancelled = 5
}