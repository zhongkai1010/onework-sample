namespace Modularity;

public interface IModule
{
    void PreConfigureServices(ServiceConfigurationContext context);

    void ConfigureServices(ServiceConfigurationContext context);

    void PostConfigureServices(ServiceConfigurationContext context);
}