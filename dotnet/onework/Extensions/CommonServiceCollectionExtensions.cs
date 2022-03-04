using Microsoft.Extensions.DependencyInjection;

namespace Extensions;

public static class CommonServiceCollectionExtensions
{
    public static bool IsAdded<T>(this IServiceCollection services)
    {
        return services.IsAdded(typeof(T));
    }
    public static bool IsAdded(this IServiceCollection services, Type type)
    {
        return services.Any(d => d.ServiceType == type);
    }

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

    public static T GetSingletonInstance<T>(this IServiceCollection services)
    {
        var service = services.GetSingletonInstanceOrNull<T>();
        if (service == null)
        {
            throw new InvalidOperationException("Could not find singleton service: " + typeof(T).AssemblyQualifiedName);
        }

        return service;
    }
}