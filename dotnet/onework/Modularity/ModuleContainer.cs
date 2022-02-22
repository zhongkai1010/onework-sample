namespace Modularity;

public class ModuleContainer: IModuleContainer
{
    public ModuleContainer(IReadOnlyList<IModuleDescriptor> modules)
    {
        Modules = modules;
    }

    public IReadOnlyList<IModuleDescriptor> Modules { get; }
}