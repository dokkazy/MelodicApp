using System.ComponentModel.DataAnnotations;

namespace Application.Models.Identity;

public class RefreshToken
{
    [Key]
    public Guid Id { get; set; }
    public required string Refresh { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime Exprires { get; set; }
}