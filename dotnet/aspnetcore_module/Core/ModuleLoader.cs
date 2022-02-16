using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

namespace OneWork.Core
{
    /// <summary>
    /// 模块加载处理类
    /// </summary>
    public class ModuleLoader : IModuleLoader
    {
        public IAppModuleDescriptor[] LoadModules(IServiceCollection services, Type startupModuleType)
        {
            Check.NotNull(services, nameof(services));
            Check.NotNull(startupModuleType, nameof(startupModuleType));

            var modules = GetDescriptors(services, startupModuleType);

            modules = SortByDependency(modules, startupModuleType);

            return modules.ToArray();

        }

        private List<IAppModuleDescriptor> GetDescriptors(
            IServiceCollection services,
            Type startupModuleType)
        {
            var modules = new List<AppModuleDescriptor>();

            FillModules(modules, services, startupModuleType);
            SetDependencies(modules);

            return modules.Cast<IAppModuleDescriptor>().ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modules"></param>
        /// <param name="services"></param>
        /// <param name="startupModuleType"></param>
        protected virtual void FillModules(List<AppModuleDescriptor> modules, IServiceCollection services,
            Type startupModuleType)
        {
            //All modules starting from the startup module
            foreach (var moduleType in AppModuleHelper.FindAllModuleTypes(startupModuleType))
            {
                modules.Add(CreateModuleDescriptor(services, moduleType));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        /// <param name="moduleType"></param>
        /// <returns></returns>
        protected virtual AppModuleDescriptor CreateModuleDescriptor(IServiceCollection services, Type moduleType)
        {
            return new AppModuleDescriptor(moduleType, CreateAndRegisterModule(services, moduleType));
        }

        protected virtual IAppModule CreateAndRegisterModule(IServiceCollection services, Type moduleType)
        {
            var module = (IAppModule)Activator.CreateInstance(moduleType);
            services.AddSingleton(moduleType, module);
            return module;
        }

        protected virtual List<IAppModuleDescriptor> SortByDependency(List<IAppModuleDescriptor> modules, Type startupModuleType)
        {
            var sortedModules = modules.SortByDependencies(m => m.Dependencies);
            sortedModules.MoveItem(m => m.Type == startupModuleType, modules.Count - 1);
            return sortedModules;
        }

        protected virtual void SetDependencies(List<AppModuleDescriptor> modules)
        {
            foreach (var module in modules)
            {
                SetDependencies(modules, module);
            }
        }

        protected virtual void SetDependencies(List<AppModuleDescriptor> modules, AppModuleDescriptor module)
        {
            foreach (var dependedModuleType in AppModuleHelper.FindDependedModuleTypes(module.Type))
            {
                var dependedModule = modules.FirstOrDefault(m => m.Type == dependedModuleType);
                if (dependedModule == null)
                {
                    throw new Exception("Could not find a depended module " + dependedModuleType.AssemblyQualifiedName + " for " + module.Type.AssemblyQualifiedName);
                }

                module.AddDependency(dependedModule);
            }
        }

    }
}