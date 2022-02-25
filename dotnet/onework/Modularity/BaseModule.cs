using Configuration;

namespace Modularity
{
    public class BaseModule : IModule
    {
        public void PreConfigureServices(ServiceConfigurationContext context)
        {

        }

        public void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddConfiguration();

            context.Services.AddConfigurationWatcher();
        }

        public void PostConfigureServices(ServiceConfigurationContext context)
        {

        }
    }
}