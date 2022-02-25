namespace Modularity
{
    public interface IModuleContainer
    {
        IReadOnlyList<IModuleDescriptor> Modules { get; }
    }
}