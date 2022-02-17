using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OneWork;
using OneWork.Modularity;

namespace Tests
{
    [DependsOn(typeof(Module1))]
    public class ApplicationBootModule : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("ApplicationBootModule-ConfigureServices");

            IConfiguration config = context.Services.GetConfiguration();

            Settings settings = config.GetRequiredSection("Settings").Get<Settings>();

            TransientFaultHandlingOptions options = new TransientFaultHandlingOptions();

            config.GetSection(nameof(TransientFaultHandlingOptions)) .Bind(options);
 
            // Write the values to the console.
            Console.WriteLine($"KeyOne = {settings.KeyOne}");
            Console.WriteLine($"KeyTwo = {settings.KeyTwo}");
            Console.WriteLine($"KeyThree:Message = {settings.KeyThree.Message}");
        }
    }
}