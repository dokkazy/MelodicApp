using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Identity.DbContext;

public class AppDbContextFactory : IDesignTimeDbContextFactory<MelodicIdentityDbContext>
{
    public MelodicIdentityDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MelodicIdentityDbContext>();
        optionsBuilder.UseSqlServer("Data Source=SQL5113.site4now.net;Initial Catalog=db_aae5f9_melodic;User Id=db_aae5f9_melodic_admin;Password=melodic123321");

        return new MelodicIdentityDbContext(optionsBuilder.Options);
    }
}