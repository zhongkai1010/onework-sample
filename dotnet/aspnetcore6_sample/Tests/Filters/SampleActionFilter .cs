using System.ComponentModel;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Tests.Filters
{
    public class SampleActionFilterAAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var attrs = context.ActionDescriptor.EndpointMetadata.OfType<DisplayNameAttribute>(); 

            string url = context.HttpContext.Request.GetDisplayUrl();
            Console.WriteLine("SampleActionFilterAAttribute-OnActionExecuted");
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine("SampleActionFilterAAttribute-OnActionExecuting");
        }
    }


    public class SampleActionFilterBAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine("SampleActionFilterBAttribute-OnActionExecuted");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            Console.WriteLine("SampleActionFilterBAttribute-OnActionExecuted");
        }
    }

}
