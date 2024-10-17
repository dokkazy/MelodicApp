// using Domain.Entities;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Configurations;
//
// public class BrandConfiguration : IEntityTypeConfiguration<Brand>
// {
//     public void Configure(EntityTypeBuilder<Brand> builder)
//     {
//         builder.Property(p => p.Name)
//             .IsRequired()
//             .HasMaxLength(100)
//             .HasColumnName("BRAND_NAME");
//     }
// }