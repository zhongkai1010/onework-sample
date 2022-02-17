using System;
using OneWork;
using OneWork.Modularity;

namespace Tests
{
    [DependsOn(typeof(Module4))]
    public class Module3 : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("Module3-ConfigureServices");
        }
    }
}