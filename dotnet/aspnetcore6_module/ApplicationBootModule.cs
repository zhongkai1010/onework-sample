using OneWork;
using OneWork.AspNetCore;
using OneWork.AspNetCore.Mvc;
using OneWork.Modularity;
using Tests;


[DependsOn(typeof(AspNetCoreMvcModule), typeof(Module1))]
public class ApplicationBootModule : AppModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddControllersWithViews();

        Console.WriteLine("ApplicationBootModule-ConfigureServices");

    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        //Console.WriteLine("ApplicationBootModule-OnApplicationInitialization");

        //Configure<TransientFaultHandlingOptions>(context.GetConfiguration().GetSection("TransientFaultHandlingOptions"));
    }
}