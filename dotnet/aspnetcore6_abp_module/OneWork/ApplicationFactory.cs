using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;
using OneWork.Modularity;
using System;

namespace OneWork
{
    public static class ApplicationFactory
    {
        public static IApplicationWithInternalServiceProvider Create<TStartupModule>(
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction = null)
            where TStartupModule : IAppModule
        {
            return Create(typeof(TStartupModule), optionsAction);
        }

        public static IApplicationWithInternalServiceProvider Create(
            [NotNull] Type startupModuleType,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction = null)
        {
            return new ApplicationWithInternalServiceProvider(startupModuleType, optionsAction);
        }

        public static IApplicationWithExternalServiceProvider Create<TStartupModule>(
            [NotNull] IServiceCollection services,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction = null)
            where TStartupModule : IAppModule
        {
            return Create(typeof(TStartupModule), services, optionsAction);
        }

        public static IApplicationWithExternalServiceProvider Create(
            [NotNull] Type startupModuleType,
            [NotNull] IServiceCollection services,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction = null)
        {
            return new ApplicationWithExternalServiceProvider(startupModuleType, services, optionsAction);
        }


    }
}