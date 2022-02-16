using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OneWork.Code;

namespace OneWork
{
    public class Program
    {
        #region 将HostApplicationLifetime 服务注入任何类以处理启动后和正常关闭任务

        static Task Main(string[] args) =>
            CreateHostBuilder(args).Build().RunAsync();

        static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureHostConfiguration(builder =>
                {
                     
                    Console.WriteLine("ConfigureHostConfiguration");
                })
                .ConfigureAppConfiguration(builder =>
                {
                    Console.WriteLine("ConfigureAppConfiguration");
                })
                .ConfigureServices((_, services) =>
                    services.AddHostedService<ExampleHostedService>());

        #endregion
    }
}