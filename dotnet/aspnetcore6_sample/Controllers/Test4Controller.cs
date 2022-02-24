using Microsoft.AspNetCore.Mvc;
using Tests;

namespace Controllers
{
    public class TestController : Controller
    {
        private readonly ICache _cache;

        public TestController(ICache cache)
        {
            _cache = cache;
        }

        public string Index()
        {
            return _cache.Get("123");
        }
    }
}