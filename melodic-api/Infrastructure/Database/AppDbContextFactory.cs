using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Database;

public class AppDbContextFactory : IDesignTimeDbContextFactory<MelodicDbContext>
{
    public MelodicDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MelodicDbContext>();
        optionsBuilder.UseSqlServer("Server=LAPTOP-P37125QH\\SABER;database=;User ID=sa;Password=123;Database=Melodic;Trusted_Connection=True;TrustServerCertificate=True;");

        return new MelodicDbContext(optionsBuilder.Options);
    }
}