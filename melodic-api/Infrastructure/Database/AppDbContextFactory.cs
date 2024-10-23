using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Database;

public class AppDbContextFactory : IDesignTimeDbContextFactory<MelodicDbContext>
{
    public MelodicDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MelodicDbContext>();
        optionsBuilder.UseSqlServer("Data Source=SQL5112.site4now.net;User Id=db_aae5f9_melodic_admin; Password=melodic123321;Initial Catalog=db_aae5f9_melodic;Integrated Security=True;Encrypt=False;Trusted_Connection=False");

        // Create a mock or default implementation of IUserService
        var userService = new DefaultUserService();

        return new MelodicDbContext(optionsBuilder.Options, userService);
    }
}
