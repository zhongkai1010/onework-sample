using System;
using System.Linq;
using JetBrains.Annotations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace OneWork.Core
{
    public static class ApplicationFactory
    {
        public static IAbpApplicationWithExternalServiceProvider Create<TStartupModule>(
            [NotNull] IServiceCollection services)
            where TStartupModule : IAppModule
        {
            return new AbpApplicationWithExternalServiceProvider(typeof(TStartupModule), services);
        }
    }

    public static class ServiceCollectionExtensions
    {
        public static IAbpApplicationWithExternalServiceProvider AddApplication<TStartupModule>([NotNull] this IServiceCollection services)
            where TStartupModule : IAppModule
        {
            //IAppModuleDescriptor[] appModuleDescriptors =
            //    new ModuleLoader().LoadModules(services, typeof(TStartupModule));

            //ServiceConfigurationContext configurationContext = new ServiceConfigurationContext(services);

            //services.AddSingleton(configurationContext);

            //foreach (var t in appModuleDescriptors)
            //{

            //    t.Instance.ConfigureServices(configurationContext);
            //}

            return ApplicationFactory.Create<TStartupModule>(services);
        }

        public static IConfiguration GetConfiguration(this IServiceCollection services)
        {
            var hostBuilderContext = services.GetSingletonInstanceOrNull<HostBuilderContext>();
            if (hostBuilderContext?.Configuration != null)
            {
                return hostBuilderContext.Configuration as IConfigurationRoot;
            }

            return services.GetSingletonInstance<IConfiguration>();
        }

        public static T GetSingletonInstance<T>(this IServiceCollection services)
        {
            var service = services.GetSingletonInstanceOrNull<T>();
            if (service == null)
            {
                throw new InvalidOperationException("Could not find singleton service: " +
                                                    typeof(T).AssemblyQualifiedName);
            }

            return service;
        }

        public static T GetSingletonInstanceOrNull<T>(this IServiceCollection services)
        {
            return (T) services
                .FirstOrDefault(d => d.ServiceType == typeof(T))
                ?.ImplementationInstance;
        }
    }
}