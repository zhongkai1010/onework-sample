using System;
using OneWork.Core;

namespace OneWork.Tests
{
    public class Module4 : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {

            Console.WriteLine("Module4-ConfigureServices");
        }
    }
}