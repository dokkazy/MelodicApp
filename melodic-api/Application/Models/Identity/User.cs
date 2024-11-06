using Domain.Entities;

namespace Application.Models.Identity;

public class User
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }

    public Basket Basket { get; set; } = new();
}