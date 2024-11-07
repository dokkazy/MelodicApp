using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Entities;

public class Basket
{
    public Guid Id { get; set; }
    public string UserId { get; set; }

    private readonly List<BasketItem> items = new();

    public IReadOnlyCollection<BasketItem> Items => items.AsReadOnly();

    public void AddItem(Guid speakerId,
        int units = 1)
    {
        var existedItem = items.SingleOrDefault(x => x.SpeakerId == speakerId);
        if (existedItem is not null)
        {
            existedItem.AddUnits(units);
        }
        else
        {
            items.Add(new BasketItem()
            {
                Quantity = units,
                SpeakerId = speakerId,
            });
        }
    }

    public void RemoveItem(Guid speakerId,
        int units = 1)
    {
        var existedItem = items.SingleOrDefault(x => x.SpeakerId == speakerId);
        if (existedItem is not null)
        {
            if (existedItem.Quantity == units)
            {
                items.Remove(existedItem);
            }
            else
            {
                existedItem.RemoveUnits(units);
            }
        }
    }


    public void DeleteItem(Guid speakerId)
    {
        items.RemoveAll(x => x.SpeakerId == speakerId);
    }

    public void EmptyBasket()
    {
        items.Clear();
    }
}