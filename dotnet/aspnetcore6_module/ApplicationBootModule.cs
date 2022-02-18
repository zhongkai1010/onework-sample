using OneWork;
using OneWork.AspNetCore;
using OneWork.AspNetCore.Mvc;
using OneWork.Modularity;
using Tests;


[DependsOn(typeof(AspNetCoreMvcModule), typeof(Module1))]
public class ApplicationBootModule : AppModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddControllersWithViews();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Console.WriteLine("ApplicationBootModule-ConfigureServices");
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        // Configure the HTTP request pipeline.
        if (!env.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
        }

        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();
    }
}