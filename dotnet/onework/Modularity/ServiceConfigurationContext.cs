using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Modularity
{
    public class ServiceConfigurationContext
    {
        public IServiceCollection Services { get; }

        public ServiceConfigurationContext(IServiceCollection services)
        {
            Services = services;
        }
    }
}