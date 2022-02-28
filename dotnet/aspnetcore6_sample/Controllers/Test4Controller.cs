using Microsoft.AspNetCore.Mvc;
using Tests.Filters;

namespace Controllers
{
    [SampleActionFilterA]
    public class Test4Controller : Controller
    {
        public string Index()
        {
            return "Test";
        }
    }
}
