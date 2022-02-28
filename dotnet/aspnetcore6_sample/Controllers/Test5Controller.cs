using Microsoft.AspNetCore.Mvc;
using Tests.Configuration;
using Tests.Filters;

namespace Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class Test5Controller : ControllerBase
    {
        [SampleActionFilterA]
        public CacheOptions Get()
        {
            CacheOptions cacheOptions = new CacheOptions();
            return cacheOptions;
        }
    }
}