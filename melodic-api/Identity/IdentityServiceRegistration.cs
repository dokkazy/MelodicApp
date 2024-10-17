using System.Text;
using Application.Identity;
using Application.Models.Identity;
using Identity.DbContext;
using Identity.Models;
using Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Identity;

public static class IdentityServiceRegistration
{
    public static IServiceCollection AddIdentityService(this IServiceCollection services
        , IConfiguration configuration)
    {
        services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
        
        services.AddDbContext<MelodicIdentityDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<MelodicIdentityDbContext>()
            .AddDefaultTokenProviders();
        
        services.AddTransient<IAuthService, AuthService>();
        services.AddTransient<IUserService, UserService>();
        
        services.AddAuthentication(item =>
        {
            item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(item =>
        {
            item.RequireHttpsMetadata = true;
            item.SaveToken = true;
            item.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ClockSkew = TimeSpan.Zero,
                ValidAudience = configuration["JwtSettings:Audience"],
                ValidIssuer = configuration["JwtSettings:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(configuration["JwtSettings:Key"]))
            };
        });
        
        return services;
    } 
}