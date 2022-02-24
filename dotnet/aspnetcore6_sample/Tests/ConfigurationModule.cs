using Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;
using Modularity;
using Tests.Configuration;

namespace Tests
{
    public class ConfigurationModule : IModule
    {
        public void ConfigureServices(ServiceConfigurationContext context)
        {
            IConfiguration configuration = context.Services.GetSingletonInstanceOrNull<IConfiguration>();

            context.Services.Configure<AppSettings>(configuration.GetSection("AppSettings"));

            context.Services.AddConfiguration(typeof(Program).Assembly);

        }
    }
}