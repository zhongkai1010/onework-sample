using Configuration;
using Microsoft.Extensions.Options;
using Modularity;
using Tests;
using Tests.Configuration;
using Tests.Dependency;

var builder = WebApplication.CreateBuilder(args);


#region Dependency

builder.Services.AddSingleton<DefaultCache>();

builder.Services.AddSingleton<RedisCache>();

builder.Services.AddSingleton<IRedisOperate>(new RedisOperate());

builder.Services.Configure<CacheOptions>(builder.Configuration.GetSection("CacheOptions"));

builder.Services.AddSingleton<ICache>(provider =>
{
    IOptions<CacheOptions> options = provider.GetRequiredService<IOptions<CacheOptions>>();
    if (options.Value.UseRedis)
    {
        return provider.GetRequiredService<RedisCache>();
    }

    return provider.GetRequiredService<DefaultCache>();
});

#endregion

#region Configuration

builder.Services.Configure<PositionOptions>(builder.Configuration.GetSection(
    PositionOptions.Position));

builder.Services.ReplaceConfiguration(builder.Configuration);

builder.Services.AddModules(typeof(BaseModule), typeof(ConfigurationModule));

#endregion



builder.Services.AddControllersWithViews();

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