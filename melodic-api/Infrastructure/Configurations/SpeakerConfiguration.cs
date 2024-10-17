// using Domain.Entities;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Configurations;
//
// public class SpeakerConfiguration : IEntityTypeConfiguration<Speaker>
// {
//     public void Configure(EntityTypeBuilder<Speaker> builder)
//     {
//         builder.Property(p => p.Name)
//             .IsRequired()
//             .HasMaxLength(100)
//             .HasColumnName("SPEAKER_NAME");
//
//         builder.Property(p => p.BrandId)
//             .IsRequired()
//             .HasColumnName("BRAND_ID");
//
//         builder.HasOne(p => p.Brand)
//             .WithMany()
//             .HasForeignKey(p => p.BrandId);
//
//         builder.Property(p => p.Price)
//             .IsRequired()
//             .HasColumnName("PRICE");
//
//         builder.Property(p => p.Decription)
//             .IsRequired()
//             .HasMaxLength(500)
//             .HasColumnName("DESCRIPTION");
//
//         builder.Property(p => p.UnitInStock)
//             .IsRequired()
//             .HasColumnName("UNITS_IN_STOCK");
//
//         builder.Property(p => p.Img)
//             .IsRequired(false)
//             .HasColumnName("IMAGE");
//
//         builder.HasMany(p => p.OrderDetails)
//             .WithOne()
//             .HasForeignKey("SpeakerId");
//     }
// }