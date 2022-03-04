using Configuration;
using JetBrains.Annotations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Modularity;

public static class ServiceCollectionApplicationExtensions
{
    public static void AddApplication<TStartupModule>(
        [NotNull] this IServiceCollection services, IConfiguration configuration)
        where TStartupModule : IAppModule
    {
        services.ReplaceConfiguration(configuration);

        ApplicationBootFactory.Create<TStartupModule>(services);
    }

    public static void AddApplication(
        [NotNull] this IServiceCollection services,
        [NotNull] Type startupModuleType, IConfiguration configuration)
    {
        services.ReplaceConfiguration(configuration);

        ApplicationBootFactory.Create(startupModuleType, services);
    }

    public class ApplicationBootFactory
    {
        public static void Create(Type startupModuleType, IServiceCollection services)
        {
            new ApplicationBoot(startupModuleType, services);
        }

        internal static void Create<TStartupModule>(IServiceCollection services) where TStartupModule : IAppModule
        {
            Create(typeof(TStartupModule), services);
        }
    }
}