using Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Options;
using Modularity;
using Tests.Configuration;
using Tests.Dependency;

namespace Tests
{
    public class ConfigurationAppModule : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            IConfiguration configuration = context.Services.GetSingletonInstanceOrNull<IConfiguration>();

            context.Services.AddSingleton<DefaultCache>();

            context.Services.AddSingleton<RedisCache>();

            context.Services.AddSingleton<IRedisOperate>(new RedisOperate());

            context.Services.Configure<CacheOptions>(configuration.GetSection("CacheOptions"));

            context.Services.AddSingleton<ICache>(provider =>
            {
                IOptions<CacheOptions> options = provider.GetRequiredService<IOptions<CacheOptions>>();
                if (options.Value.UseRedis)
                {
                    return provider.GetRequiredService<RedisCache>();
                }

                return provider.GetRequiredService<DefaultCache>();
            });

            context.Services.Configure<PositionOptions>(configuration.GetSection(PositionOptions.Position));

            context.Services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.RequireAuthenticatedSignIn = true;
                })
                .AddJwtBearer(options =>
                {
                
                })
                .AddCookie(options =>
                {
                    options.LoginPath = "/Login/A";
                    options.LogoutPath = "/Login/C";
                });


            context.Services.AddControllersWithViews(options => { options.Filters.Add(new AuthorizeFilter()); });

            context.Services.AddHttpContextAccessor();
        }
    }
}