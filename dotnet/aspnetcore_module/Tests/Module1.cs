using System;
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

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            base.OnApplicationInitialization(context);

        }

        public override void PostConfigureServices(ServiceConfigurationContext context)
        {
            base.PostConfigureServices(context);
        }
    }
}