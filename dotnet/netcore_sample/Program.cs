using System;
using System.IO;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace OneWork
{
    class Program
    {
        static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            IHostBuilder hostBuilder = Host.CreateDefaultBuilder(args);

            /**
             * 主机配置
             * 
             **/
            hostBuilder.ConfigureHostConfiguration((configurationBuilder) =>
            {
                configurationBuilder.SetBasePath(Directory.GetCurrentDirectory());
                configurationBuilder.AddJsonFile("appsettings.json", optional: false);
                configurationBuilder.AddEnvironmentVariables(prefix: "PREFIX_");
                configurationBuilder.AddCommandLine(args);
            });

            /**
             * 应用配置
             * 
             **/
            hostBuilder.ConfigureAppConfiguration((hostingContext, configurationBuilder) =>
            {

                IHostEnvironment env = hostingContext.HostingEnvironment;

                Console.WriteLine("hostBuilder.ConfigureAppConfiguration,env:{0}", env.EnvironmentName);
            });

            /**
             * 日志配置
             * 
             **/
            hostBuilder.ConfigureLogging((hostContext, builder) =>
            {
                IConfigurationSection configurationSection = hostContext.Configuration.GetSection("enableConsoleJson");
                if (configurationSection.Value == "true")
                {
                    builder.AddJsonConsole(options =>
                    {
                        options.IncludeScopes = false;
                        options.TimestampFormat = "hh:mm:ss ";
                        options.JsonWriterOptions = new JsonWriterOptions
                        {
                            Indented = true
                        };
                    });
                }
            });

            /**
             * 框架提供的服务
             * 
             **/
            hostBuilder.ConfigureServices((hostContext, services) =>
            {
                services.AddHostedService<CustomHostedService>();

                Console.WriteLine("hostBuilder.ConfigureServices");
            });

            return hostBuilder;
        }
    }
}