using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OneWork.Models;

namespace OneWork.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private IConfigurationRoot configurationRoot;

        public HomeController(ILogger<HomeController> logger, IConfiguration configurationRoot)
        {
            _logger = logger;
            this.configurationRoot = (IConfigurationRoot)configurationRoot;
        }

        public IActionResult Index()
        {
            List<IConfigurationProvider> providers = configurationRoot.Providers.ToList();


            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}