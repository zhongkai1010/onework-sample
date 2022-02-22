using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OneWork.Tests
{
    public static class ConfigurationServiceCollectionExtensions
    {
        public static void AddConfiguration(this IServiceCollection services, IConfiguration configuration,
            Assembly assembly)
        {
            List<Type> types = new List<Type>();

            GetBaseConfigTypes(types, assembly.GetExportedTypes());

            foreach (Type type in types)
            {
                services.AddSingleton(type, provider => CreateConfig(type, configuration));
            }
        }

        public static T GetSingletonInstanceOrNull<T>(this IServiceCollection services)
        {
#pragma warning disable CS8600
#pragma warning disable CS8603
            return (T) services
                .FirstOrDefault(d => d.ServiceType == typeof(T))
                ?.ImplementationInstance;
#pragma warning restore CS8603
#pragma warning restore CS8600
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