using Configuration;
using Modularity;

namespace Tests
{
    public class ConfigurationModule : IModule
    {
        public void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddConfiguration(typeof(ConfigurationModule).Assembly);
        }
    }
}