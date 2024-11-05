using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Database;

public class AppDbContextFactory : IDesignTimeDbContextFactory<MelodicDbContext>
{
    public MelodicDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MelodicDbContext>();
        optionsBuilder.UseSqlServer("Data Source=.;User Id=sa; Password=123;Initial Catalog=Melodic;Integrated Security=True;Encrypt=False;Trusted_Connection=False");

        // Create a mock or default implementation of IUserService
        var userService = new DefaultUserService();

        return new MelodicDbContext(optionsBuilder.Options, null, userService);
    }
}
