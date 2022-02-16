using System;
using OneWork.Core;

namespace OneWork.Tests
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