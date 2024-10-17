using System.ComponentModel.DataAnnotations;
using Domain.Common;

namespace Domain.Entities;

public class Order : AuditableEntity
{
    [Key]
    public Guid OrderId { get; set; }
    public Guid? UserId { get; set; }
    public string? FullName { get; set; }
    public string? Address { get; set; }
    public double? Tax { get; set; }
    public double? Discount { get; set; }
    public double? Total { get; set; }
    public double? TotalPrice { get; set; }
    public string? Payment { get; set; }
    public string? PhoneNumber { get; set; }

    public List<OrderDetail> OrderDetails { get; set; } = new ();
    
}
