using Configuration;
using Microsoft.Extensions.Options;
using Tests;
using Tests.Configuration;
using Tests.Dependency;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication<ConfigurationAppModule>(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();