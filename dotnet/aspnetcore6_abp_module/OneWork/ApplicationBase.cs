using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;
using OneWork.DependencyInjection;
using OneWork.Internal;
using OneWork.Modularity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OneWork
{
    public abstract class ApplicationBase : IApplication
    {
        public IReadOnlyList<IAppModuleDescriptor> Modules { get; }

        public Type StartupModuleType { get; }

        public IServiceCollection Services { get; }

        public IServiceProvider ServiceProvider { get; set; }

        internal ApplicationBase(
            [NotNull] Type startupModuleType,
            [NotNull] IServiceCollection services,
            [CanBeNull] Action<ApplicationCreationOptions> optionsAction)
        {
            Check.NotNull(startupModuleType, nameof(startupModuleType));
            Check.NotNull(services, nameof(services));

            StartupModuleType = startupModuleType;
            Services = services;

            services.TryAddObjectAccessor<IServiceProvider>();

            var options = new ApplicationCreationOptions(services);
            optionsAction?.Invoke(options);

            services.AddSingleton<IApplication>(this);
            services.AddSingleton<IModuleContainer>(this);

            services.AddCoreServices();

            services.AddCoreAppServices(this, options);

            Modules = LoadModules(services, options);

            ConfigureServices();
        }

        public void Shutdown()
        {
            using (var scope = ServiceProvider.CreateScope())
            {
                scope.ServiceProvider
                    .GetRequiredService<IModuleManager>()
                    .ShutdownModules(new ApplicationShutdownContext(scope.ServiceProvider));
            }
        }

        public virtual void Dispose()
        {
        }

       

        protected void SetServiceProvider(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
            ServiceProvider.GetRequiredService<ObjectAccessor<IServiceProvider>>().Value = ServiceProvider;
        }


        protected void InitializeModules()
        {
            using (var scope = ServiceProvider.CreateScope())
            {
                scope.ServiceProvider
                    .GetRequiredService<IModuleManager>()
                    .InitializeModules(new ApplicationInitializationContext(scope.ServiceProvider));
            }
        }

        protected virtual IReadOnlyList<IAppModuleDescriptor> LoadModules(IServiceCollection services, ApplicationCreationOptions options)
        {
            return services
                .GetSingletonInstance<IModuleLoader>()
                .LoadModules(
                    services,
                    StartupModuleType
                );
        }

        protected virtual void ConfigureServices()
        {
            var context = new ServiceConfigurationContext(Services);
            Services.AddSingleton(context);

            foreach (var module in Modules)
            {
                if (module.Instance is AppModule appModule)
                {
                    appModule.ServiceConfigurationContext = context;
                }
            }

            //PreConfigureServices
            foreach (var module in Modules.Where(m => m.Instance is IPreConfigureServices))
            {
                try
                {
                    ((IPreConfigureServices)module.Instance).PreConfigureServices(context);
                }
                catch (Exception ex)
                {
                    throw new Exception($"An error occurred during {nameof(IPreConfigureServices.PreConfigureServices)} phase of the module {module.Type.AssemblyQualifiedName}. See the inner exception for details.", ex);
                }
            }

            //ConfigureServices
            foreach (var module in Modules)
            {
                if (module.Instance is AppModule appModule)
                {
                    if (!appModule.SkipAutoServiceRegistration)
                    {
                        Services.AddAssembly(module.Type.Assembly);
                    }
                }

                try
                {
                    module.Instance.ConfigureServices(context);
                }
                catch (Exception ex)
                {
                    throw new Exception($"An error occurred during {nameof(IAppModule.ConfigureServices)} phase of the module {module.Type.AssemblyQualifiedName}. See the inner exception for details.", ex);
                }
            }

            //PostConfigureServices
            foreach (var module in Modules.Where(m => m.Instance is IPostConfigureServices))
            {
                try
                {
                    ((IPostConfigureServices)module.Instance).PostConfigureServices(context);
                }
                catch (Exception ex)
                {
                    throw new Exception($"An error occurred during {nameof(IPostConfigureServices.PostConfigureServices)} phase of the module {module.Type.AssemblyQualifiedName}. See the inner exception for details.", ex);
                }
            }

            foreach (var module in Modules)
            {
                if (module.Instance is AppModule appModule)
                {
                    appModule.ServiceConfigurationContext = null;
                }
            }
        }


    }
}