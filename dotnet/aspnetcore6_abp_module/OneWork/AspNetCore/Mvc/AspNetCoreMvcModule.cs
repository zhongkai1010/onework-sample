using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OneWork.AspNetCore.Mvc.DependencyInjection;
using OneWork.DynamicProxy;
using OneWork.Modularity;

namespace OneWork.AspNetCore.Mvc
{
    [DependsOn(typeof(AspNetCoreModule))]
    public class AspNetCoreMvcModule:AppModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            //DynamicProxyIgnoreTypes.Add<ControllerBase>();
            //DynamicProxyIgnoreTypes.Add<PageModel>();

            //context.Services.AddConventionalRegistrar(new AspNetCoreMvcConventionalRegistrar());
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {

            //Configure<EndpointRouterOptions>(options =>
            //{
            //    options.EndpointConfigureActions.Add(endpointContext =>
            //    {
            //        endpointContext.Endpoints.MapControllerRoute("defaultWithArea", "{area}/{controller=Home}/{action=Index}/{id?}");
            //        endpointContext.Endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            //        endpointContext.Endpoints.MapRazorPages();
            //    });
            //});
        }
    }
}
