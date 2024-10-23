using System.ComponentModel.DataAnnotations;
using Domain.Common;

namespace Domain.Entities;

public class Brand : AuditableEntity
{
    // public Guid BrandId { get; set; }
    [Required]
    public string? Name { get; set; }


}
