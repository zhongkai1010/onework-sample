using Modularity;

namespace Tests
{
    public class Module1 : IModule
    {
        public void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("Module1-ConfigureServices");

            
        }
    }
}
