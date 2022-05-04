using Microsoft.AspNetCore.Mvc;
using Tests.Configuration;

namespace Controllers;

public class Test6Controller : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        PositionOptions positionOptions = new PositionOptions();
        return Json(positionOptions);
    }
}