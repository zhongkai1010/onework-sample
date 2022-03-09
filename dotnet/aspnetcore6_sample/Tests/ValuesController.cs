using Microsoft.AspNetCore.Mvc;

namespace Tests
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public string Get() => "API";
    }
}
