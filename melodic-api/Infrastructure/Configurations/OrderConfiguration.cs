// using Domain.Entities;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Configurations;
//
// public class OrderConfiguration : IEntityTypeConfiguration<Order>
// {
//     public void Configure(EntityTypeBuilder<Order> builder)
//     {
//         builder.Property(p => p.UserId)
//             .IsRequired(false)
//             .HasColumnName("USER_ID");
//
//         builder.Property(p => p.FullName)
//             .IsRequired(false)
//             .HasMaxLength(100)
//             .HasColumnName("FULL_NAME");
//
//         builder.Property(p => p.Address)
//             .IsRequired(false)
//             .HasMaxLength(200)
//             .HasColumnName("ADDRESS");
//
//         builder.Property(p => p.Tax)
//             .IsRequired(false)
//             .HasColumnName("TAX");
//
//         builder.Property(p => p.Discount)
//             .IsRequired(false)
//             .HasColumnName("DISCOUNT");
//
//         builder.Property(p => p.Total)
//             .IsRequired(false)
//             .HasColumnName("TOTAL");
//
//         builder.Property(p => p.TotalPrice)
//             .IsRequired(false)
//             .HasColumnName("TOTAL_PRICE");
//
//         builder.Property(p => p.Payment)
//             .IsRequired(false)
//             .HasMaxLength(50)
//             .HasColumnName("PAYMENT");
//
//         builder.Property(p => p.PhoneNumber)
//             .IsRequired(false)
//             .HasMaxLength(15)
//             .HasColumnName("PHONE_NUMBER");
//
//         builder.HasMany(p => p.OrderDetails)
//             .WithOne()
//             .HasForeignKey("OrderId");
//     }
// }