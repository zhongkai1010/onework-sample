using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Configuration
{
    public static class ConfigurationServiceCollectionExtensions
    {

        public static IServiceCollection ReplaceConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            return services.Replace(ServiceDescriptor.Singleton(configuration));
        }

        public static void AddConfiguration(this IServiceCollection services, Assembly assembly)
        {
            List<Type> types = new List<Type>();

            IConfiguration configuration = services.GetSingletonInstanceOrNull<IConfiguration>();

            GetBaseConfigTypes(types, assembly.GetExportedTypes());

            foreach (Type type in types)
            {
                services.AddSingleton(type, provider => CreateConfig(type, configuration));
            }
        }

        public static T GetSingletonInstanceOrNull<T>(this IServiceCollection services)
        {
            return (T) services
                .FirstOrDefault(d => d.ServiceType == typeof(T))
                ?.ImplementationInstance;
        }


        private static object CreateConfig(Type type, IConfiguration configuration)
        {
            var obj = Activator.CreateInstance(type);

            type.InvokeMember("Load", BindingFlags.InvokeMethod, null, obj, new[] {configuration});

            return obj;
        }

        private static void GetBaseConfigTypes(List<Type> configsTypes, Type[] types)
        {
            foreach (var type in types)
            {
                if (type.BaseType == null) continue;

                if (type.BaseType.IsGenericType)
                {
                    if (type.BaseType.GetGenericTypeDefinition() == typeof(BaseConfig<>))
                        configsTypes.Add(type);
                }
            }
        }
    }
}