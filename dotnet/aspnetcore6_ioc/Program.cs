using Microsoft.Extensions.Options;
using Tests;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddSingleton<DefaultCache>();

builder.Services.AddSingleton<RedisCache>();

builder.Services.AddSingleton<IRedisOperate>( new RedisOperate());

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
