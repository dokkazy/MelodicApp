using Domain.Common;
using Domain.Entities;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database;

public class MelodicDbContext(DbContextOptions<MelodicDbContext> options) : DbContext(options)
{
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<EVoucher> EVouchers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<Speaker> Speakers { get; set; }
    public DbSet<Payment> Payment { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Cart>().HasKey(c => new { c.UserId, c.SpeakerId });
        modelBuilder.Entity<Payment>().HasNoKey();
        modelBuilder.Entity<Speaker>().HasMany(e => e.OrderDetails).WithOne(e => e.Speaker).HasForeignKey(e => e.SpeakerId);
        modelBuilder.Entity<Order>().HasKey(e => e.OrderId);
        modelBuilder.Entity<OrderDetail>().HasKey(e => new { e.OrderId, e.SpeakerId });
        modelBuilder.Entity<EVoucher>().HasData(
           new EVoucher()
           {
               VoucherId = new Guid("E09F2A37-F53E-4AAD-8DBA-35BE56184C50"),
               Code = "EVOUNCHERKM5%",
               VouncherName = "KM5%",
               Description = "Discount 5% for speaker",
               Percent = 0.5
           },
           new EVoucher()
           {
               VoucherId = new Guid("DA20E3E7-A8F6-4ACE-ABEE-3F03436D33D2"),
               Code = "EVOUNCHERKM10%",
               VouncherName = "KM10%",
               Description = "Discount 10% for speaker",
               Percent = 0.10
           },
           new EVoucher()
           {
               VoucherId = new Guid("E9CF62F1-BDDE-48C3-A3A0-58BC7696AD7A"),
               Code = "EVOUNCHERKM15%",
               VouncherName = "KM15%",
               Description = "Discount 15% for speaker",
               Percent = 0.15
           },
           new EVoucher()
           {
               VoucherId = new Guid("A723D28B-24D6-4C58-9E3A-0BDCB93580D2"),
               Code = "EVOUNCHERKM20%",
               VouncherName = "KM20%",
               Description = "Discount 20% for speaker",
               Percent = 0.20
           },
           new EVoucher()
           {
               VoucherId = new Guid("BF712960-13F1-4BE0-A34B-8F53A1095FAF"),
               Code = "EVOUNCHERKM25%",
               VouncherName = "KM25%",
               Description = "Discount 25% for speaker",
               Percent = 0.25
           }
        );

        modelBuilder.Entity<Brand>().HasData(new Brand()
        {
            BrandId = new Guid("F27EFFCE-038F-4253-A632-14AA0ACC89CA"),
            Name = "JBL"
        },
        new Brand()
        {
            BrandId = new Guid("F8C6CC19-38E0-4867-8216-43092F01AF05"),
            Name = "Logitech"
        }, 
        new Brand()
        {
            BrandId = new Guid("DB66C4F6-162C-4F56-A8B9-0832BD3A81F2"),
            Name = "Sony"
        }, 
        new Brand()
        {
            BrandId = new Guid("8B0EAC64-C224-4A6F-9971-D875E1FAC9FE"),
            Name = "Nanomax"
        }
        );

        modelBuilder.Entity<Speaker>().HasData(new Speaker()
        {
            Id = new Guid("8ABE03F8-BFC0-42B0-8A69-850826A14DB4"),
            Name = "Sony SRS-XB13",
            BrandId = new Guid("F8C6CC19-38E0-4867-8216-43092F01AF05"),
            Price = 950000,
            Decription = "Portable Bluetooth speaker with light show",
            UnitInStock = 10,
            Img = "https://cdn.tgdd.vn/Products/Images/2162/249767/sony-srs-xb13-150323-031134-600x600.jpg"
        });
        // Apply all configurations from assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MelodicDbContext).Assembly);
        
    }
    
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<AuditableEntity>()
                     .Where(q => q.State is EntityState.Added or EntityState.Modified))
        {
            entry.Entity.LastModified = DateTime.Now;

            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.Now;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}