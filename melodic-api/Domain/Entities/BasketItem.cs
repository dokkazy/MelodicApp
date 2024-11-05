using eShop.Ordering.Domain.Exceptions;

namespace Domain.Entities;

public class BasketItem
{
    public Guid BasketId { get; set; }
    public Guid SpeakerId { get; set; }
    public int Quantity { get; set; }

    public void AddUnits(int quantity)
    {
        if (quantity < 0)
        {
            throw new OrderingDomainException("Invalid units");
        }

        Quantity += quantity;
    }
}