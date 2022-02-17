using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;

namespace OneWork
{
    public class ServiceConfigurationContext
    {
        public IServiceCollection Services { get; }


        public ServiceConfigurationContext([NotNull] IServiceCollection services)
        {
            Services = Check.NotNull(services, nameof(services));
        }
    }
}