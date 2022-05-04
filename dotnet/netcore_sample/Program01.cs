using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace OneWork
{
    //public class Program
    //{
    //    private static void Main(string[] args)
    //    {
    //        #region 依赖注入

    //        IHostBuilder hostBuilder = Host.CreateDefaultBuilder(args);
    //        hostBuilder.ConfigureServices((hostBuilderContext, serviceCollection) =>
    //        {
    //            serviceCollection.AddTransient<IRepository>(provider => new UserRepository());
    //        });
    //        IHost host = hostBuilder.Build();

    //        IServiceScope serviceScope = host.Services.CreateScope();
    //        IRepository repository = serviceScope.ServiceProvider.GetRequiredService<IRepository>();
    //        repository.Add();

    //        host.Run();

    //        #endregion
    //    }
    //}
}
