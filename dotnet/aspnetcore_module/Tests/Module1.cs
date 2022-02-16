using Microsoft.Extensions.DependencyInjection;
using OneWork.Core;

namespace OneWork.Tests
{
    [DependsOn(typeof(Module2))]
    public class Module1 : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();

            Configure<Module1Options>(configuration.GetSection(Module1Options.Module1));
        }
    }


    public class Module1Options
    {
        public const string Module1 = "Module1";

        public string Name { get; set; }
    }

}