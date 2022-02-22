using Configuration;
using Modularity;

namespace OneWork.Tests
{
    public class ConfigurationModule : IModule
    {
        public void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddConfiguration(typeof(Startup).Assembly);
        }
    }
}