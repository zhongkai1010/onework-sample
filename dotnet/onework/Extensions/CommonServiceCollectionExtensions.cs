using Microsoft.Extensions.DependencyInjection;


public static class CommonServiceCollectionExtensions
{

    public static T GetSingletonInstanceOrNull<T>(this IServiceCollection services)
    {
#pragma warning disable CS8600
#pragma warning disable CS8603
        return (T)services
            .FirstOrDefault(d => d.ServiceType == typeof(T))
            ?.ImplementationInstance;
#pragma warning restore CS8603
#pragma warning restore CS8600
    }
}