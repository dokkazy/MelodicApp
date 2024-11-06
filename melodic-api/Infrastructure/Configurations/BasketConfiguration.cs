// using Application.Models.Identity;
// using Domain.Entities;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Configurations;
//
// public class BasketConfiguration : IEntityTypeConfiguration<Basket>
// {
//     public void Configure(EntityTypeBuilder<Basket> builder)
//     {
//         builder.HasOne<User>()                      // UserProfile has one User (even though we don't have a navigation property)
//             .WithOne()                            // No navigation property on User (in this case)
//             .HasForeignKey<Basket>(up => up.BuyerId) // The foreign key is UserId in UserProfile
//             .IsRequired();                        
//     }
// }