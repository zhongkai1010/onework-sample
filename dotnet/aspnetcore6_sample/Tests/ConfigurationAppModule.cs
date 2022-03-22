using Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
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



            //context.Services.AddAuthentication(options =>
            //    {
            //        options.DefaultScheme = "Login1";
            //        options.RequireAuthenticatedSignIn = true;
            //    })
            //    .AddPolicyScheme("Login1", "Login1", options =>
            //    {

            //    })
            //    .AddCookie("Login1",options =>
            //    {
            //        options.Cookie.Name = "Auth1";
            //        options.LoginPath = "/Login1/A";
            //        options.LogoutPath = "/Login1/C";
            //    })
            //    .AddCookie("Login2", options =>
            //    {
            //        options.Cookie.Name = "Auth2";
            //        options.LoginPath = "/Login2/A";
            //        options.LogoutPath = "/Login2/C";
            //    });


            context.Services.AddControllersWithViews();
            // context.Services.AddControllersWithViews(options => { options.Filters.Add(new AuthorizeFilter()); });

            context.Services.AddHttpContextAccessor();
        }
    }
}