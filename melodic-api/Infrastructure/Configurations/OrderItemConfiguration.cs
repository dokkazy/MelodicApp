using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(e => new { e.OrderId, e.SpeakerId });
        builder.Property(p => p.SpeakerId)
            .IsRequired()
            .HasColumnName("SPEAKER_ID");

        builder.Property(p => p.OrderId)
            .IsRequired()
            .HasColumnName("ORDER_ID");

        builder.Property(p => p.Units)
            .IsRequired(false)
            .HasColumnName("UNITS");

        builder.HasOne(p => p.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(p => p.OrderId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(p => p.Speaker)
            .WithMany()
            .HasForeignKey(p => p.SpeakerId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.Property(x => x.UnitPrice).IsRequired().HasColumnName("UNIT_PRICE").HasPrecision(18, 2);
        builder.Property(x => x.Discount).HasColumnName("DISCOUNT").HasPrecision(18, 2);
        builder.Property(x => x.SpeakerUrl).IsRequired(false).HasColumnName("SPEAKER_URL");
    }
}