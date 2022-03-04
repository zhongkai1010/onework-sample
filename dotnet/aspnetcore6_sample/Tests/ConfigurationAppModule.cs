using Extensions;
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

            context.Services.AddControllersWithViews();
        }
    }
}