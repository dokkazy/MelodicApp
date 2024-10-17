
using Application;
using Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services
    .AddApplicationService()
    .AddInfrastructureService(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("all", corsPolicyBuilder => corsPolicyBuilder
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors("all");

app.Run();