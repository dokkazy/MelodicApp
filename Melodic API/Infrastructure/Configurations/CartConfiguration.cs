// using Domain.Entities;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Configurations;
//
// public class CartConfiguration : IEntityTypeConfiguration<Cart>
// {
//     public void Configure(EntityTypeBuilder<Cart> builder)
//     {
//         builder.Property(p => p.Quantity)
//             .HasColumnName("QUANTITY");
//     }
// }