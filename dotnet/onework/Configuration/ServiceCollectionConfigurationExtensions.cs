using Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Reflection;
using System.Reflection;

namespace Configuration
{
    public static class ServiceCollectionConfigurationExtensions
    {
        public static IServiceCollection ReplaceConfiguration(this IServiceCollection services,
            IConfiguration configuration)
        {
            return services.Replace(ServiceDescriptor.Singleton(configuration));
        }

        public static void AddConfiguration(this IServiceCollection services)
        {
            ITypeFinder typeFinder = services.GetSingletonInstanceOrNull<ITypeFinder>();

            List<Type> types = new List<Type>();

            GetBaseConfigTypes(types, typeFinder.Types.ToArray());

            IConfiguration configuration = services.GetSingletonInstanceOrNull<IConfiguration>();

            services.Configure<AppSettings>(configuration.GetSection("AppSettings"));

            foreach (Type type in types)
            {
                services.AddSingleton(type, _ => CreateConfig(type, configuration));
            }
        }

        public static void GetBaseConfigTypes(List<Type> configsTypes, Type[] types)
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

        public static void AddConfigurationWatcher(this IServiceCollection services)
        {
            services.AddHostedService<ConfigFileWatcher>();
        }

        private static object CreateConfig(Type type, IConfiguration configuration)
        {
            var obj = Activator.CreateInstance(type);

            AppSettings appSettings = configuration.GetSection("AppSettings").Get<AppSettings>();

            type.InvokeMember("Load", BindingFlags.InvokeMethod, null, obj, new object[] { appSettings });

            return obj;
        }
    }
}