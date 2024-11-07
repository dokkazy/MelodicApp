using Application.Contracts.Persistence;
using Infrastructure.Database;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureService(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<MelodicDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        });
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        
        services.Configure<AuthMessageSenderOption>(configuration.GetSection(AuthMessageSenderOption.AuthMessagesSender));
        services.AddScoped<ISpeakerRepository, SpeakerRepository>();
        services.AddScoped<IApplicationDbContext, MelodicDbContext>();
        services.AddScoped<IEmailSender, EmailSender>();
        services.AddScoped<IBrandRepository, BrandRepository>();
        // services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        // services.AddScoped<IBrandRepository, BrandRepository>();
        return services;
    }
}