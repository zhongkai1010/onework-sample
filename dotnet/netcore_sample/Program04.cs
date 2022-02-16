using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace OneWork
{
    //public class Program
    //{
    //    private static async Task Main(string[] args)
    //    {
    //        #region JSON 配置提供程序

    //        using IHost host = Host.CreateDefaultBuilder(args)
    //            .ConfigureAppConfiguration((hostingContext, configuration) =>
    //            {
    //                configuration.Sources.Clear();

    //                IHostEnvironment env = hostingContext.HostingEnvironment;

    //                configuration
    //                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    //                    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true);

    //                IConfigurationRoot configurationRoot = configuration.Build();

    //                TransientFaultHandlingOptions options = new TransientFaultHandlingOptions();
    //                configurationRoot.GetSection(nameof(TransientFaultHandlingOptions))
    //                    .Bind(options);

    //                Console.WriteLine($"TransientFaultHandlingOptions.Enabled={options.Enabled}");
    //                Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={options.AutoRetryDelay}");
    //            })
    //            .Build();

    //        await host.RunAsync();

    //        #endregion
    //    }
    //}
}