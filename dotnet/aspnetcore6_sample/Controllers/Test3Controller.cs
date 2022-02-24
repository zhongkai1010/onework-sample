using Microsoft.AspNetCore.Mvc;
using Tests.Dependency;

namespace Controllers
{
    /// <summary>
    ///  验证依赖注入功能
    /// </summary>
    public class Test3Controller : Controller
    {
        private readonly ICache _cache;

        public Test3Controller(ICache cache)
        {
            _cache = cache;
        }

        public string Index()
        {
            return _cache.Get("123");
        }
    }
}