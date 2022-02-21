using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using OneWork.Modularity;

namespace OneWork.AspNetCore
{
    public class AspNetCoreModule : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddObjectAccessor<IApplicationBuilder>();

            context.Services.AddHttpContextAccessor();
        }
    }
}
