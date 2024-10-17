// using Domain.Entities;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Configurations;
//
// public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetail>
// {
//     public void Configure(EntityTypeBuilder<OrderDetail> builder)
//     {
//         builder.Property(p => p.SpeakerId)
//             .IsRequired()
//             .HasColumnName("SPEAKER_ID");
//
//         builder.Property(p => p.OrderId)
//             .IsRequired()
//             .HasColumnName("ORDER_ID");
//
//         builder.Property(p => p.Quantity)
//             .IsRequired(false)
//             .HasColumnName("QUANTITY");
//
//         builder.HasOne(p => p.Order)
//             .WithMany(o => o.OrderDetails)
//             .HasForeignKey(p => p.OrderId)
//             .OnDelete(DeleteBehavior.NoAction);
//         
//         builder.HasOne(p => p.Speaker)
//             .WithMany()
//             .HasForeignKey(p => p.SpeakerId)
//             .OnDelete(DeleteBehavior.NoAction);
//     }
// }