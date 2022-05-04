using Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace Modularity;

public class ModuleLoader : IModuleLoader
{
    public IModuleDescriptor[] LoadModules(IServiceCollection services, Type startupModuleType)
    {
        Check.NotNull(services, nameof(services));
        Check.NotNull(startupModuleType, nameof(startupModuleType));

        var modules = GetDescriptors(services, startupModuleType);

        modules = SortByDependency(modules, startupModuleType);

        return modules.ToArray();
    }

    protected virtual void SetDependencies(List<ModuleDescriptor> modules)
    {
        foreach (var module in modules)
        {
            SetDependencies(modules, module);
        }
    }

    protected virtual void FillModules(
        List<ModuleDescriptor> modules,
        IServiceCollection services,
        Type startupModuleType)
    {
        //All modules starting from the startup appModule
        foreach (var moduleType in ModuleHelper.FindAllModuleTypes(startupModuleType))
        {
            modules.Add(CreateModuleDescriptor(services, moduleType));
        }
    }

    protected virtual ModuleDescriptor CreateModuleDescriptor(IServiceCollection services, Type moduleType,
        bool isLoadedAsPlugIn = false)
    {
        return new ModuleDescriptor(moduleType, CreateAndRegisterModule(services, moduleType));
    }

    protected virtual List<IModuleDescriptor> SortByDependency(List<IModuleDescriptor> modules, Type startupModuleType)
    {
        var sortedModules = modules.SortByDependencies(m => m.Dependencies);
        sortedModules.MoveItem(m => m.Type == startupModuleType, modules.Count - 1);
        return sortedModules;
    }

    protected virtual IAppModule CreateAndRegisterModule(IServiceCollection services, Type moduleType)
    {
        var module = (IAppModule)Activator.CreateInstance(moduleType);
        services.AddSingleton(moduleType, module);
        return module;
    }

    protected virtual void SetDependencies(List<ModuleDescriptor> modules, ModuleDescriptor module)
    {
        foreach (var dependedModuleType in ModuleHelper.FindDependedModuleTypes(module.Type))
        {
            var dependedModule = modules.FirstOrDefault(m => m.Type == dependedModuleType);
            if (dependedModule == null)
            {
                throw new Exception("Could not find a depended module " + dependedModuleType.AssemblyQualifiedName +
                                    " for " + module.Type.AssemblyQualifiedName);
            }

            module.AddDependency(dependedModule);
        }
    }

    private List<IModuleDescriptor> GetDescriptors(
        IServiceCollection services,
        Type startupModuleType)
    {
        var modules = new List<ModuleDescriptor>();

        FillModules(modules, services, startupModuleType);

        SetDependencies(modules);

        return modules.Cast<IModuleDescriptor>().ToList();
    }
}