namespace Modularity;

public interface IAppModule
{
    void PreConfigureServices(ServiceConfigurationContext context);

    void ConfigureServices(ServiceConfigurationContext context);

    void PostConfigureServices(ServiceConfigurationContext context);
}