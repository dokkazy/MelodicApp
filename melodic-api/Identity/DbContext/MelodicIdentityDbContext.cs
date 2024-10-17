using Identity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Identity.DbContext;

public class MelodicIdentityDbContext : IdentityDbContext<ApplicationUser>
{
    public MelodicIdentityDbContext(DbContextOptions<MelodicIdentityDbContext> options) : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(MelodicIdentityDbContext).Assembly);
    }
}