using JetBrains.Annotations;
using OneWork;
using OneWork.Modularity;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionApplicationExtensions
    {
        public static IApplicationWithExternalServiceProvider AddApplication<TStartupModule>(
            [NotNull] this IServiceCollection services,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction = null)
            where TStartupModule : IAppModule
        {
            return ApplicationFactory.Create<TStartupModule>(services, optionsAction);
        }

        public static IApplicationWithExternalServiceProvider AddApplication(
            [NotNull] this IServiceCollection services,
            [NotNull] Type startupModuleType,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction = null)
        {
            return ApplicationFactory.Create(startupModuleType, services, optionsAction);
        }
    }
}
