using Microsoft.Extensions.DependencyInjection;
using Reflection;
using System.Reflection;

namespace Modularity
{
    public static class ModuleServiceCollectionExtensions
    {
        public static void AddModules(this IServiceCollection services, params Type[] types)
        {
            IReadOnlyList<IModuleDescriptor> descriptors = InitModules(services, types);

            ModuleContainer moduleContainer = new ModuleContainer(descriptors);

            AssemblyFinder assemblyFinder = new AssemblyFinder(moduleContainer);

            services.AddSingleton<IModuleContainer>(moduleContainer);

            services.AddSingleton<IAssemblyFinder>(assemblyFinder);

            services.AddSingleton<ITypeFinder>(new TypeFinder(assemblyFinder));

            ConfigureServices(services, descriptors);
        }

        private static void ConfigureServices(IServiceCollection services, IReadOnlyList<IModuleDescriptor> modules)
        {
            var context = new ServiceConfigurationContext(services);

            services.AddSingleton(context);

            foreach (IModuleDescriptor module in modules)
            {
                module.Instance.ConfigureServices(context);
            }
        }

        private static IReadOnlyList<IModuleDescriptor> InitModules(IServiceCollection services, Type[] types)
        {
            List<IModuleDescriptor> descriptors = new List<IModuleDescriptor>();
            foreach (Type type in types)
            {
                if (!IsAppModule(type))
                    throw new Exception($"type is not IModule,type name:{type.FullName}");

                IModuleDescriptor moduleDescriptor = CreateModuleDescriptor(services, type);

                descriptors.Add(moduleDescriptor);
            }

            return descriptors;
        }

        private static IModuleDescriptor CreateModuleDescriptor(IServiceCollection services, Type moduleType)
        {
            return new ModuleDescriptor(moduleType, CreateModule(services, moduleType));
        }

        private static IModule CreateModule(IServiceCollection services, Type moduleType)
        {
            IModule module = (IModule)Activator.CreateInstance(moduleType);
            services.AddSingleton(moduleType, module);
            return module;
        }

        /// <summary>
        ///  
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private static bool IsAppModule(Type type)
        {
            var typeInfo = type.GetTypeInfo();

            return
                typeInfo.IsClass &&
                !typeInfo.IsAbstract &&
                !typeInfo.IsGenericType &&
                typeof(IModule).GetTypeInfo().IsAssignableFrom(type);
        }
    }
}