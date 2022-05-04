using Extensions;
using System.Collections.Immutable;
using System.Reflection;

namespace Modularity
{
    public class ModuleDescriptor : IModuleDescriptor
    {
        public IReadOnlyList<IModuleDescriptor> Dependencies => _dependencies.ToImmutableList();

        private readonly List<IModuleDescriptor> _dependencies;


        public ModuleDescriptor(Type type, IAppModule instance)
        {
            if (!type.GetTypeInfo().IsInstanceOfType(instance))
            {
                throw new ArgumentException(
                    $"Given appModule instance ({instance.GetType().AssemblyQualifiedName}) is not an instance of given appModule type: {type.AssemblyQualifiedName}");
            }

            Type = type;
            Assembly = type.Assembly;
            Instance = instance;

            _dependencies = new List<IModuleDescriptor>();
        }

        public Type Type { get; }

        public Assembly Assembly { get; }

        public IAppModule Instance { get; }


        public override string ToString()
        {
            return $"[AppModuleDescriptor {Type.FullName}]";
        }

        public void AddDependency(IModuleDescriptor descriptor)
        {
            _dependencies.AddIfNotContains(descriptor);
        }
    }
}