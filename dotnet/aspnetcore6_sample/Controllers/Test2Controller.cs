using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Tests;

namespace Controllers
{
    public class Test2Controller : Controller
    {
        private readonly PositionOptions _options;

        public Test2Controller(IOptions<PositionOptions> options)
        {
            _options = options.Value;
        }

        public IActionResult Index()
        {
            return Content($"Title: {_options.Title} \n" +
                           $"Name: {_options.Name}");
        }
    }
}
