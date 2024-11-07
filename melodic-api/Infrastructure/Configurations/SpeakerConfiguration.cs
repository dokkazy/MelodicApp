using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class SpeakerConfiguration : IEntityTypeConfiguration<Speaker>
{
    public void Configure(EntityTypeBuilder<Speaker> builder)
    {
        builder
            .HasMany(e => e.OrderItems)
            .WithOne(e => e.Speaker)
            .HasForeignKey(e => e.SpeakerId)
            .HasPrincipalKey(e => e.Id);
    }
}