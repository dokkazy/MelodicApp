// using Domain.Entities;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Configurations;
//
// public class EVoucherConfiguration : IEntityTypeConfiguration<EVoucher>
// {
//     public void Configure(EntityTypeBuilder<EVoucher> builder)
//     {
//         builder.Property(p => p.Code)
//             .IsRequired()
//             .HasMaxLength(100)
//             .HasColumnName("VOUCHER_CODE");
//         
//         builder.Property(p => p.VouncherName)
//             .IsRequired()
//             .HasMaxLength(100)
//             .HasColumnName("VOUCHER_NAME");
//         
//         builder.Property(p => p.Percent)
//             .IsRequired()
//             .HasColumnName("VOUCHER_PERCENT");
//         
//         builder.Property(p => p.Description)
//             .IsRequired()
//             .HasMaxLength(100)
//             .HasColumnName("VOUCHER_DESCRIPTION");
//     }
// }