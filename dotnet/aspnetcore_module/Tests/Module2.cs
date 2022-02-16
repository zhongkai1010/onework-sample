using System;
using OneWork.Core;

namespace OneWork.Tests
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