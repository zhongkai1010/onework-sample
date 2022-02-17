using System;
using OneWork;
using OneWork.Modularity;

namespace Tests
{
    public class Module4 : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {

            Console.WriteLine("Module4-ConfigureServices");
        }
    }
}