 

using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using OneWork;
using OneWork.AspNetCore;
using OneWork.Modularity;
using Tests;

[DependsOn(typeof(Module1))]
public class ApplicationBootModule : AppModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Console.WriteLine("ApplicationBootModule-ConfigureServices");

        context.Services.AddControllers();
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        IApplicationBuilder app = context.GetApplicationBuilder();
        IHostingEnvironment env = context.GetEnvironment();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
}