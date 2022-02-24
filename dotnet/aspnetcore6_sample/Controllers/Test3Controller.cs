using Microsoft.AspNetCore.Mvc;
using Tests;

namespace Controllers
{
    public class Test3Controller : Controller
    {
        private readonly AliyunOSSConfig _aliyunOssConfig;

        public Test3Controller(AliyunOSSConfig aliyunOssConfig)
        {
            _aliyunOssConfig = aliyunOssConfig;

        }

        public string A()
        {
            return _aliyunOssConfig.Instance.AccessKeyId;
        }
    }
}
