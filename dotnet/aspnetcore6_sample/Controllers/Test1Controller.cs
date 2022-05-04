using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Tests.Configuration;

namespace Controllers
{
    /// <summary>
    /// 验证获取appsettings.json文件配置信息
    /// </summary>


    public class Test1Controller : Controller
    {
        private readonly IConfiguration Configuration;

        public PositionOptions PositionOptions { get; }

        public Test1Controller(IConfiguration configuration, IOptions<PositionOptions> options)
        {
            Configuration = configuration;

            PositionOptions = options.Value;

        }

        /// <summary>
        ///  获取根节点配置
        ///  获取层级节点配置
        /// </summary>
        /// <returns></returns>
        public ContentResult A()
        {
            var myKeyValue = Configuration["MyKey"];
            var title = Configuration["Position:Title"];
            var name = Configuration["Position:Name"];
            var defaultLogLevel = Configuration["Logging:LogLevel:Default"];


            return Content($"MyKey value: {myKeyValue} \n" +
                           $"Title: {title} \n" +
                           $"Name: {name} \n" +
                           $"Default Log Level: {defaultLogLevel}");
        }

        /// <summary>
        /// 选择模式 - 通过构造函数注入对象，获取绑定对象的配置
        /// </summary>
        /// <returns></returns>
        public ContentResult B()
        {
            return Content($"Title: {PositionOptions.Title} \n" + $"Name: {PositionOptions.Name}");
        }


        /// <summary>
        /// 选项模式 - 直接通过Configuration的Get获取对象配置
        /// </summary>
        /// <returns></returns>
        public ContentResult C()
        {
            PositionOptions temPositionOptions = Configuration.GetSection(PositionOptions.Position)
                .Get<PositionOptions>();

            return Content($"Title: {temPositionOptions.Title} \n" +
                           $"Name: {temPositionOptions.Name}");
        }

        /// <summary>
        /// 获取连接字符串
        /// </summary>
        /// <returns></returns>
        public ContentResult D()
        {
            string value = Configuration.GetConnectionString("Default");

            return Content(value);
        }
    }
}