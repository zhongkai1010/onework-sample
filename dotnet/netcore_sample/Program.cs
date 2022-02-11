using System;
using System.IO;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace OneWork
{
    public class Program
    {
        private static void Main(string[] args)
        {
            #region 依赖注入

            //IHostBuilder hostBuilder = Host.CreateDefaultBuilder(args);
            //hostBuilder.ConfigureServices((hostBuilderContext, serviceCollection) =>
            //{
            //    serviceCollection.AddTransient<IRepository>(provider => new UserRepository());
            //});
            //IHost host = hostBuilder.Build();

            //IServiceScope serviceScope = host.Services.CreateScope();
            //IRepository repository = serviceScope.ServiceProvider.GetRequiredService<IRepository>();
            //repository.Add();

            //host.Run();

            #endregion

            #region .NET配置 基本示例

            //IConfiguration config = new ConfigurationBuilder()
            //    .AddJsonFile("appsettings.json")
            //    .AddEnvironmentVariables()
            //    .Build();

            //Settings settings = config.GetRequiredSection("Settings").Get<Settings>();

            //// Write the values to the console.
            //Console.WriteLine($"KeyOne = {settings.KeyOne}");
            //Console.WriteLine($"KeyTwo = {settings.KeyTwo}");
            //Console.WriteLine($"KeyThree:Message = {settings.KeyThree.Message}");

            #endregion

            #region .NET配置 使用托管的基本示例

            //using IHost host = Host.CreateDefaultBuilder(args).Build();

            //IConfiguration config = host.Services.GetRequiredService<IConfiguration>();

            //int keyOneValue = config.GetValue<int>("KeyOne");
            //bool keyTwoValue = config.GetValue<bool>("KeyTwo");
            //string keyThreeNestedValue = config.GetValue<string>("KeyThree:Message");

            //Console.WriteLine($"KeyOne = {keyOneValue}");
            //Console.WriteLine($"KeyTwo = {keyTwoValue}");
            //Console.WriteLine($"KeyThree:Message = {keyThreeNestedValue}");

            //await host.RunAsync();

            #endregion

            #region JSON 配置提供程序

            //using IHost host = Host.CreateDefaultBuilder(args)
            //    .ConfigureAppConfiguration((hostingContext, configuration) =>
            //    {
            //        configuration.Sources.Clear();

            //        IHostEnvironment env = hostingContext.HostingEnvironment;

            //        configuration
            //            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            //            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true);

            //        IConfigurationRoot configurationRoot = configuration.Build();

            //        TransientFaultHandlingOptions options = new TransientFaultHandlingOptions();
            //        configurationRoot.GetSection(nameof(TransientFaultHandlingOptions))
            //            .Bind(options);

            //        Console.WriteLine($"TransientFaultHandlingOptions.Enabled={options.Enabled}");
            //        Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={options.AutoRetryDelay}");
            //    })
            //    .Build();

            //await host.RunAsync();

            #endregion

            #region 环境变量配置提供程序

            //using IHost host = Host.CreateDefaultBuilder(args).Build();

            //IConfiguration config = host.Services.GetRequiredService<IConfiguration>();

            //string secretKey = config.GetValue<string>("SecretKey");

            //Console.WriteLine($"KeyOne = {secretKey}");

            //return Task.CompletedTask;

            #endregion

            #region .NET 中的选项模式

            //using IHost host = Host.CreateDefaultBuilder(args)
            //    .ConfigureContainer()
            //    .ConfigureServices((context, services) =>
            //    {
                    
            //    })
            //    .Build();

            // host.Run();

            #endregion

            #region .NET 依赖注入方式的选项模式

            //using IHost host = Host.CreateDefaultBuilder(args)
            //    .ConfigureServices((context, services) =>
            //    {
            //        services.Configure<TransientFaultHandlingOptions>(
            //            context.Configuration.GetSection("TransientFaultHandlingOptions"));
            //    })
            //    .Build();

            //TransientFaultHandlingOptions options =
            //    host.Services.GetRequiredService<IOptions<TransientFaultHandlingOptions>>().Value;
            //Console.WriteLine($"Enabled={options.Enabled}");
            //Console.WriteLine($"AutoRetryDelay={options.AutoRetryDelay}");

            //host.Run();

            #endregion


            #region 通用主机

            #endregion
        }
    }


    public interface IRepository
    {
        void Add();
    }

    public abstract class BaseRepository : IRepository
    {
        public void Add()
        {
            Console.WriteLine("BaseRepository_Add");
        }
    }


    public class UserRepository : IRepository
    {
        public void Add()
        {
            Console.WriteLine("UserRepository_Add");
        }
    }

    public class TransientFaultHandlingOptions
    {
        public bool Enabled { get; set; }
        public TimeSpan AutoRetryDelay { get; set; }
    }

    public class Settings
    {
        public int KeyOne { get; set; }
        public bool KeyTwo { get; set; }
        public NestedSettings KeyThree { get; set; } = null!;
    }

    public class NestedSettings
    {
        public string Message { get; set; } = null!;
    }
}