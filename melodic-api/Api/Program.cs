using Api.Middleware;
using Application;
using Application.Feature.Brand.Queries.GetAllBrands;
using Application.Feature.Speakers.Queries.GetAllSpeakers;
using Identity;
using Infrastructure;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services
    .AddApplicationService()
    .AddInfrastructureService(builder.Configuration)
    .AddIdentityService(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("all", corsPolicyBuilder => corsPolicyBuilder
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod());
});

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
        
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
    // c.SwaggerDoc("v4", new OpenApiInfo { Title = "GAS API", Version = "v4" });
    // var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    // var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    // c.IncludeXmlComments(xmlPath);
});

builder.Services.AddOptions<BearerTokenOptions>(IdentityConstants.BearerScheme).Configure(options => {
    options.BearerTokenExpiration = TimeSpan.FromMinutes(1);
});

builder.Services.AddRouting(options => options.LowercaseUrls = true);

IEdmModel GetEdmModel()
{
    var odataBuilder = new ODataConventionModelBuilder();

    // Entity Sets and Model Definitions
    odataBuilder.EntitySet<SpeakerDto>("Speakers");

    return odataBuilder.GetEdmModel();
}


builder.Services.AddControllers().AddOData(options =>
    options.AddRouteComponents("odata", GetEdmModel()) // Define OData route
           .Select()
           .Filter()
           .OrderBy()
           .SetMaxTop(100)
           .Count());



var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("all");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

