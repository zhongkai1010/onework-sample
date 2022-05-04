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
 
        var configuration = context.Services.GetConfiguration();

        Configure<TransientFaultHandlingOptions>(configuration.GetSection("TransientFaultHandlingOptions"));
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
         Console.WriteLine("ApplicationBootModule-OnApplicationInitialization");

 
        // var app = context.GetApplicationBuilder();
        // var env = context.GetEnvironment();

        //// Configure the HTTP request pipeline.
        //if (!env.IsDevelopment())
        // {
        //     app.UseExceptionHandler("/Home/Error");
        // }
        // app.UseStaticFiles();

        // app.UseRouting();

        // app.UseAuthorization();

        // app.MapControllerRoute(
        //     name: "default",
        //     pattern: "{controller=Home}/{action=Index}/{id?}");

    }
}