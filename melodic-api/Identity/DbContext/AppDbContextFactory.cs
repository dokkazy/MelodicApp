using Identity.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Database;

public class AppDbContextFactory : IDesignTimeDbContextFactory<MelodicIdentityDbContext>
{
    public MelodicIdentityDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MelodicIdentityDbContext>();
        optionsBuilder.UseSqlServer("Server=.;Database=Melodic;Trusted_Connection=True;TrustServerCertificate=True;");

        return new MelodicIdentityDbContext(optionsBuilder.Options);
    }
}