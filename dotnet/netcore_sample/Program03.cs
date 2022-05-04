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
    //        #region .NET配置 使用托管的基本示例

    //        using IHost host = Host.CreateDefaultBuilder(args).Build();

    //        IConfiguration config = host.Services.GetRequiredService<IConfiguration>();

    //        int keyOneValue = config.GetValue<int>("KeyOne");
    //        bool keyTwoValue = config.GetValue<bool>("KeyTwo");
    //        string keyThreeNestedValue = config.GetValue<string>("KeyThree:Message");

    //        Console.WriteLine($"KeyOne = {keyOneValue}");
    //        Console.WriteLine($"KeyTwo = {keyTwoValue}");
    //        Console.WriteLine($"KeyThree:Message = {keyThreeNestedValue}");

    //        await host.RunAsync();

    //        #endregion
    //    }
    //}
}