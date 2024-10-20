using Identity.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Database;

public class AppDbContextFactory : IDesignTimeDbContextFactory<MelodicIdentityDbContext>
{
    public MelodicIdentityDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MelodicIdentityDbContext>();
        optionsBuilder.UseSqlServer("Data Source=SQL5112.site4now.net;User Id=db_aae5f9_melodic_admin; Password=melodic123321;Initial Catalog=db_aae5f9_melodic;Integrated Security=True;Encrypt=False;Trusted_Connection=False");

        return new MelodicIdentityDbContext(optionsBuilder.Options);
    }
}