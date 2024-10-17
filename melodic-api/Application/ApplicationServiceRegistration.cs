using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        
        // services.AddAutoMapper(typeof(ApplicationServiceRegistration));
        // services.AddMediatR(typeof(ApplicationServiceRegistration));
        return services;
    }
}