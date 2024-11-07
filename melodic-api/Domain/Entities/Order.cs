using System.ComponentModel.DataAnnotations;
using Domain.ValueObjects;
using eShop.Ordering.Domain.Exceptions;

namespace Domain.Entities;

public class Order
{
    public Guid Id { get; set; }
    public int OrderCode { get; private set; }
    public string UserId { get; }
    public DateTime OrderDate { get; private set; }

    [Required] public Address Address { get; private set; }
    [Required] public string PhoneNumber { get; private set; }
    public double? Tax { get; private set; }

    public string Description { get; private set; }
    public OrderStatus OrderStatus { get; private set; }
    public string PaymentId { get; set; }

    private readonly List<OrderItem> _orderItems;

    public IReadOnlyCollection<OrderItem> OrderItems => _orderItems.AsReadOnly();

    public Order() {}

    public Order(string userId, Address address, int orderCode, string phoneNumber)
    {
        UserId = userId;
        OrderStatus = OrderStatus.Submitted;
        OrderDate = DateTime.UtcNow;
        Address = address;
        OrderCode = orderCode;
        PhoneNumber = phoneNumber;
        Description = string.Empty;
        _orderItems = new List<OrderItem>();
    }

    public void AddOrderItem(Guid speakerId, string speakerName, double unitPrice, double discount,
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
            var orderItem = new OrderItem(speakerId, speakerName, unitPrice, discount, units);
            _orderItems.Add(orderItem);
        }
    }

    public void SetCancelledStatusWhenStockIsRejected(IEnumerable<Guid> orderStockRejectedItems)
    {
        if (OrderStatus == OrderStatus.Submitted)
        {
            OrderStatus = OrderStatus.Cancelled;

            var itemsStockRejectedProductNames = OrderItems
                .Where(c => orderStockRejectedItems.Contains(c.SpeakerId))
                .Select(c => c.SpeakerName);

            var itemsStockRejectedDescription = string.Join(", ", itemsStockRejectedProductNames);
            Description = $"The product items don't have stock: ({itemsStockRejectedDescription}).";
        }
    }

    public void SetCancelledStatus()
    {
        if (OrderStatus == OrderStatus.Paid ||
            OrderStatus == OrderStatus.Shipped)
        {
            StatusChangeException(OrderStatus.Cancelled);
        }

        OrderStatus = OrderStatus.Cancelled;
    }

    public void SetPaidStatus()
    {
        if (OrderStatus == OrderStatus.StockConfirmed)
        {
            OrderStatus = OrderStatus.Paid;
        }
    }

    public void SetShippedStatus()
    {
        if (OrderStatus != OrderStatus.Paid)
        {
            StatusChangeException(OrderStatus.Shipped);
        }

        OrderStatus = OrderStatus.Shipped;
    }

    private void StatusChangeException(OrderStatus orderStatusToChange)
    {
        throw new OrderingDomainException(
            $"Is not possible to change the order status from {OrderStatus} to {orderStatusToChange}.");
    }
    
    public void SetStockConfirmedStatus()
    {
        if (OrderStatus == OrderStatus.Submitted)
        {
            OrderStatus = OrderStatus.StockConfirmed;
            Description = "All the items were confirmed with available stock.";
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