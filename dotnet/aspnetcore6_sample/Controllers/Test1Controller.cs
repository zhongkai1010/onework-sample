using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Tests;

namespace Controllers
{
    public class Test1Controller : Controller
    {
        private readonly IConfiguration Configuration;

        public PositionOptions positionOptions { get; private set; }

        public Test1Controller(IConfiguration configuration, IOptions<PositionOptions> positionOptions)
        {
            Configuration = configuration;
        }

        /// <summary>
        ///  默认配置
        /// </summary>
        /// <returns></returns>
        public ContentResult GetDefault()
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
        /// 选项模式
        /// </summary>
        /// <returns></returns>
        public ContentResult GetOptions()
        {
            var positionOptions = new PositionOptions();
            Configuration.GetSection(PositionOptions.Position).Bind(positionOptions);

            return Content($"Title: {positionOptions.Title} \n" +
                           $"Name: {positionOptions.Name}");
        }


        /// <summary>
        /// 选项模式 - ConfigurationBinder.Get<T> 
        /// </summary>
        /// <returns></returns>
        public ContentResult GetOptionByGets()
        {
            positionOptions = Configuration.GetSection(PositionOptions.Position)
                .Get<PositionOptions>();

            return Content($"Title: {positionOptions.Title} \n" +
                           $"Name: {positionOptions.Name}");
        }

        /// <summary>
        /// 获取连接字符串
        /// </summary>
        /// <returns></returns>

        public ContentResult GetConnectionString()
        {
            string value = Configuration.GetConnectionString("Default");

            return Content(value);
        }
    }
}