using System;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OneWork.Core
{
    public abstract class AppModule : IAppModule
    {
        private ServiceConfigurationContext _serviceConfigurationContext;

        public virtual void ConfigureServices(ServiceConfigurationContext context)
        {
        }

        protected internal ServiceConfigurationContext ServiceConfigurationContext
        {
            get
            {
                if (_serviceConfigurationContext == null)
                {
                    throw new Exception(
                        $"{nameof(ServiceConfigurationContext)} is only available in the {nameof(ConfigureServices)} methods.");
                }

                return _serviceConfigurationContext;
            }
            internal set => _serviceConfigurationContext = value;
        }


        public static bool IsAbpModule(Type type)
        {
            var typeInfo = type.GetTypeInfo();

            return
                typeInfo.IsClass &&
                !typeInfo.IsAbstract &&
                !typeInfo.IsGenericType &&
                typeof(IAppModule).GetTypeInfo().IsAssignableFrom(type);
        }

        internal static void CheckAbpModuleType(Type moduleType)
        {
            if (!IsAbpModule(moduleType))
            {
                throw new ArgumentException("Given type is not an app module: " + moduleType.AssemblyQualifiedName);
            }
        }

        protected void Configure<TOptions>(IConfiguration configuration)
            where TOptions : class
        {
            ServiceConfigurationContext.Services.Configure<TOptions>(configuration);
        }
    }
}