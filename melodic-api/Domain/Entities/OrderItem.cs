using System.ComponentModel.DataAnnotations;
using eShop.Ordering.Domain.Exceptions;

namespace Domain.Entities;

public class OrderItem
{
    [Required] public string SpeakerName { get; private set; }

    public Guid SpeakerId { get; private set; }
    public Guid OrderId { get; private set; }
    public int Units { get; set; }

    public double UnitPrice { get; private set; }
    public double Discount { get; private set; }


    public Order Order { get; set; } = null!;
    public Speaker Speaker { get; set; } = null!;

    public OrderItem()
    {
    }

    public OrderItem(Guid speakerId, string speakerName, double unitPrice, double discount,
        int units = 1)
    {
        if (units <= 0)
        {
            throw new OrderingDomainException("Invalid number of units");
        }

        if ((unitPrice * units) < discount)
        {
            throw new OrderingDomainException("The total of order item is lower than applied discount");
        }

        SpeakerId = speakerId;
        SpeakerName = speakerName;
        UnitPrice = unitPrice;
        Discount = discount;
        Units = units;
    }

    public void SetNewDiscount(double discount)
    {
        if (discount < 0)
        {
            throw new OrderingDomainException("Discount is not valid");
        }

        Discount = discount;
    }

    public void AddUnits(int units)
    {
        if (units < 0)
        {
            throw new OrderingDomainException("Invalid units");
        }

        Units += units;
    }
}