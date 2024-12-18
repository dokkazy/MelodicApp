using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(e => new { e.OrderId, e.SpeakerId });

        builder.HasOne(p => p.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(p => p.OrderId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(p => p.Speaker)
            .WithMany(o=> o.OrderItems)
            .HasForeignKey(p => p.SpeakerId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.Property(x => x.UnitPrice).IsRequired().HasColumnName("UNIT_PRICE");
        builder.Property(x => x.Discount).HasColumnName("DISCOUNT");
    }
}