using System.Reflection;

namespace Modularity
{
    public class ModuleDescriptor : IModuleDescriptor
    {
        public ModuleDescriptor(Type type, IModule instance)
        {
            if (!type.GetTypeInfo().IsInstanceOfType(instance))
            {
                throw new ArgumentException(
                    $"Given module instance ({instance.GetType().AssemblyQualifiedName}) is not an instance of given module type: {type.AssemblyQualifiedName}");
            }

            Type = type;
            Assembly = type.Assembly;
            Instance = instance;
        }

        public Type Type { get; }

        public Assembly Assembly { get; }

        public IModule Instance { get; }

        public override string ToString()
        {
            return $"[AppModuleDescriptor {Type.FullName}]";
        }
    }
}