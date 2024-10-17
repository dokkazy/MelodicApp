using Domain.Common;

namespace Domain.Entities;

public class OrderDetail : AuditableEntity
{
    public Guid SpeakerId { get; set; }
    public Guid OrderId{ get; set; }
    public int? Quantity { get; set; }

    public Order Order { get; set; } = null!;
    public Speaker Speaker { get; set; } = null!;
}
