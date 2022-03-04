using DependencyInjection;
using Extensions;
using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;
using Modularity;

public class ApplicationBoot : IApplicationBoot
{
    public Type StartupModuleType { get; }

    public IServiceCollection Services { get; }

    public IServiceProvider ServiceProvider { get; private set; }

    public IReadOnlyList<IModuleDescriptor> Modules { get; }

    internal ApplicationBoot(
        [NotNull] Type startupModuleType,
        [NotNull] IServiceCollection services)
    {
        Check.NotNull(startupModuleType, nameof(startupModuleType));
        Check.NotNull(services, nameof(services));

        StartupModuleType = startupModuleType;
        Services = services;

        services.TryAddObjectAccessor<IServiceProvider>();

        services.AddSingleton<IApplicationBoot>(this);

        services.AddSingleton<IModuleContainer>(this);

        services.AddCoreServices();

        services.AddCoreAbpServices(this);

        Modules = LoadModules(services);

        ConfigureServices();
    }

    private void ConfigureServices()
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
        foreach (var module in Modules)
        {
            try
            {
                module.Instance.PreConfigureServices(context);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    $"An error occurred during PreConfigureServices phase of the module {module.Type.AssemblyQualifiedName}. See the inner exception for details.",
                    ex);
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
                throw new Exception(
                    $"An error occurred during {nameof(IAppModule.ConfigureServices)} phase of the module {module.Type.AssemblyQualifiedName}. See the inner exception for details.",
                    ex);
            }
        }

        //PostConfigureServices
        foreach (var module in Modules)
        {
            try
            {
                module.Instance.PostConfigureServices(context);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    $"An error occurred during {nameof(IAppModule.PostConfigureServices)} phase of the module {module.Type.AssemblyQualifiedName}. See the inner exception for details.",
                    ex);
            }
        }

        foreach (var module in Modules)
        {
            if (module.Instance is AppModule abpModule)
            {
                abpModule.ServiceConfigurationContext = null;
            }
        }
    }

    protected virtual IReadOnlyList<IModuleDescriptor> LoadModules(IServiceCollection services)
    {
        return services
            .GetSingletonInstance<IModuleLoader>()
            .LoadModules(
                services,
                StartupModuleType
            );
    }

    public void Shutdown()
    {
    }

    public void Dispose()
    {
    }
}