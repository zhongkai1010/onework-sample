using System;
using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;

namespace OneWork
{
    internal class ApplicationWithExternalServiceProvider : ApplicationBase, IApplicationWithExternalServiceProvider
    {
        public ApplicationWithExternalServiceProvider(
            [NotNull] Type startupModuleType,
            [NotNull] IServiceCollection services,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction
        ) : base(
            startupModuleType,
            services,
            optionsAction)
        {
            services.AddSingleton<IApplicationWithExternalServiceProvider>(this);
        }

        public void Initialize(IServiceProvider serviceProvider)
        {
            Check.NotNull(serviceProvider, nameof(serviceProvider));

            SetServiceProvider(serviceProvider);

            InitializeModules();
        }

        public override void Dispose()
        {
            base.Dispose();

            if (ServiceProvider is IDisposable disposableServiceProvider)
            {
                disposableServiceProvider.Dispose();
            }
        }
    }
}