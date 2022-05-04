using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Tests;
using Tests.Configuration;

namespace Controllers
{
    /// <summary>
    /// 自定义配置文件目录，验证目录配置文件
    /// </summary>
    public class Test2Controller : Controller
    {
        private readonly AliyunOSSConfig _aliyunOssConfig;

        public Test2Controller(AliyunOSSConfig aliyunOssConfig)
        {
            _aliyunOssConfig = aliyunOssConfig;

        }

        /// <summary>
        /// 验证文件配置是否加载成功
        /// </summary>
        /// <returns></returns>
        public string A()
        {
            return _aliyunOssConfig.Instance.AccessKeyId;
        }

        public  string B()
        {
            return "B";
        }
            
    }
}
