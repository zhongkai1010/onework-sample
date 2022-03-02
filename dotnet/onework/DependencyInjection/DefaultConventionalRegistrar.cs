using System.Reflection;
using Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace DependencyInjection
{
    public class DefaultConventionalRegistrar : ConventionalRegistrarBase
    {
        public override void AddType(IServiceCollection services, Type type)
        {
            var lifeTime = GetServiceLifetimeFromClassHierarcy(type);

            if (lifeTime == null)
            {
                return;
            }

            var exposedServiceTypes = GetExposedServiceTypes(type);

            foreach (var exposedServiceType in exposedServiceTypes)
            {
                services.Add(ServiceDescriptor.Describe(
                    exposedServiceType,
                    type,
                    lifeTime.Value
                ));
            }
        }


        private List<Type> GetExposedServiceTypes(Type targetType)
        {
            var serviceTypes = new List<Type>();

            serviceTypes.AddRange(GetDefaultServices(targetType));

            serviceTypes.Add(targetType);

            return serviceTypes;
        }

        private List<Type> GetDefaultServices(Type type)
        {
            var serviceTypes = new List<Type>();

            foreach (var interfaceType in type.GetTypeInfo().GetInterfaces())
            {
                var interfaceName = interfaceType.Name;

                if (interfaceName.StartsWith("I"))
                {
                    interfaceName = interfaceName.Right(interfaceName.Length - 1);
                }

                if (type.Name.EndsWith(interfaceName))
                {
                    serviceTypes.Add(interfaceType);
                }
            }

            return serviceTypes;
        }

        private ServiceLifetime? GetServiceLifetimeFromClassHierarcy(Type type)
        {
            if (typeof(ITransientDependency).GetTypeInfo().IsAssignableFrom(type))
            {
                return ServiceLifetime.Transient;
            }

            if (typeof(ISingletonDependency).GetTypeInfo().IsAssignableFrom(type))
            {
                return ServiceLifetime.Singleton;
            }

            if (typeof(IScopedDependency).GetTypeInfo().IsAssignableFrom(type))
            {
                return ServiceLifetime.Scoped;
            }

            return null;
        }
    }
}