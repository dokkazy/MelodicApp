using Application.Models.Identity;
using Domain.Entities;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Application.Contracts.Persistence;

public interface IApplicationDbContext
{
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<BasketItem> BasketItems { get; set; }
    public DbSet<EVoucher> EVouchers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Speaker> Speakers { get; set; }
    public DbSet<Payment> Payment { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}