using System;
using Microsoft.Extensions.DependencyInjection;
using OneWork;
using OneWork.Modularity;

namespace Tests
{
    [DependsOn(typeof(Module3))]
    public class Module2 : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("Module2-ConfigureServices");
 
        }
    }
}