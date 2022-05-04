using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace OneWork
{
    internal class ApplicationWithInternalServiceProvider : ApplicationBase, IApplicationWithInternalServiceProvider
    {
        public IServiceScope ServiceScope { get; private set; }

         public ApplicationWithInternalServiceProvider(
            [NotNull] Type startupModuleType,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction
        ) : this(
            startupModuleType,
            new ServiceCollection(),
            optionsAction)
        {

        }
        private ApplicationWithInternalServiceProvider(
            [NotNull] Type startupModuleType,
            [NotNull] IServiceCollection services,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction
        ) : base(
            startupModuleType,
            services,
            optionsAction)
        {
            Services.AddSingleton<IApplicationWithInternalServiceProvider>(this);
        }

        public void Initialize()
        {
            ServiceScope = Services.BuildServiceProviderFromFactory().CreateScope();
            SetServiceProvider(ServiceScope.ServiceProvider);

            InitializeModules();
        }

        public override void Dispose()
        {
            base.Dispose();
            ServiceScope.Dispose();
        }
    }
}