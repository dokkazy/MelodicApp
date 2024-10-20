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

