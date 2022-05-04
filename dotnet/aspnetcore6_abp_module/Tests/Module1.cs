using System;
using Microsoft.Extensions.DependencyInjection;
using OneWork;
using OneWork.Modularity;

namespace Tests
{
    [DependsOn(typeof(Module2))]
    public class Module1 : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("Module1-ConfigureServices");
        }
    }
}