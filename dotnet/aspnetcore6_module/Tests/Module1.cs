using Modularity;

namespace Tests
{
    public class Module1 : IModule
    {
        public void PreConfigureServices(ServiceConfigurationContext context)
        {
            
        }

        public void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("Module1-ConfigureServices");

        }

        public void PostConfigureServices(ServiceConfigurationContext context)
        {
           
        }
    }
}
