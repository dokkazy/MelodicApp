using FirstAPI.Models.Domain;
using FirstAPI.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Customer> Customer { get; set; }
    public DbSet<RefreshToken> RefreshToken { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasIndex(x => x.UserName).IsUnique();
            entity.Property(x => x.Password).IsRequired().HasMaxLength(250);
            entity.Property(x => x.UserName).IsRequired().HasMaxLength(20);
            entity.Property(x => x.Gmail).IsRequired().HasMaxLength(200);
        });
    }
}
