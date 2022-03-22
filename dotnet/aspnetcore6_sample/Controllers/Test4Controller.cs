using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Tests.Filters;

namespace Controllers
{
    [SampleActionFilterA]
    public class Test4Controller : Controller
    {

        [DisplayName("123")]
        public string Index()
        {
            return "Test";
        }
    }
}
