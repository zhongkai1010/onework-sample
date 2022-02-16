using System;
using Microsoft.Extensions.Options;
using OneWork.Core;

namespace OneWork.Tests
{
    [DependsOn(typeof(Module1))]
    public class ApplicationBootModule : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("ApplicationBootModule-ConfigureServices");


            IOptions<Module1Options> options = context.Services.GetSingletonInstance<IOptions<Module1Options>>();

            Console.WriteLine($"ApplicationBootModule-ConfigureServices-Config:{options.Value.Name}");
        }
    }
}