using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Models;
using Tests;

namespace Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly TransientSample _transientSample;

        public HomeController(ILogger<HomeController> logger, TransientSample transientSample)
        {
            _logger = logger;
            _transientSample = transientSample;
        }

        public IActionResult Index()
        {
            _transientSample.Output();
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}