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
    //        #region 环境变量配置提供程序

    //        //using IHost host = Host.CreateDefaultBuilder(args).Build();

    //        //IConfiguration config = host.Services.GetRequiredService<IConfiguration>();

    //        //string secretKey = config.GetValue<string>("SecretKey");

    //        //Console.WriteLine($"KeyOne = {secretKey}");

    //        //return Task.CompletedTask;

    //        #endregion

    //        #region .NET 中的选项模式

    //        //using IHost host = Host.CreateDefaultBuilder(args)
    //        //    .ConfigureContainer()
    //        //    .ConfigureServices((context, services) =>
    //        //    {

    //        //    })
    //        //    .Build();

    //        // host.Run();

    //        #endregion
    //    }
    //}
}