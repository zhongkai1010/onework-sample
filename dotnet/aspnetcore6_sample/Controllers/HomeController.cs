using System.Diagnostics;
using Configuration;
using Microsoft.AspNetCore.Mvc;
using Models;
using Tests;

namespace Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> Index()
        {
            if (WebRequstContext.Current != null)
            {
                await TestPut();
            }

            object appSettings = System.Configuration.ConfigurationManager.GetSection("AppSettings");




            return View();
        }

        private Task TestPut()
        {
            Console.WriteLine($"Controller Thread:{Thread.GetCurrentProcessorId()}");
            Console.WriteLine($"     {WebRequstContext.Current.Request.Path}");

            return Task.CompletedTask;
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