using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.Property(p => p.UserId)
            .IsRequired(true);
        builder.Property(p => p.PaymentId).IsRequired(false);
        builder
            .OwnsOne(o => o.Address);
    }
}