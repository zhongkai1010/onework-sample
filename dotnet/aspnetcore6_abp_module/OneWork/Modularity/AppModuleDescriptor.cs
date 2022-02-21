using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Reflection;
using JetBrains.Annotations;

namespace OneWork.Modularity
{
    public class AppModuleDescriptor : IAppModuleDescriptor
    {
        public IReadOnlyList<IAppModuleDescriptor> Dependencies => _dependencies.ToImmutableList();

        private readonly List<IAppModuleDescriptor> _dependencies;

        public AppModuleDescriptor(
            [NotNull] Type type,
            [NotNull] IAppModule instance)
        {
            Check.NotNull(type, nameof(type));
            Check.NotNull(instance, nameof(instance));

            if (!type.GetTypeInfo().IsInstanceOfType(instance))
            {
                throw new ArgumentException(
                    $"Given module instance ({instance.GetType().AssemblyQualifiedName}) is not an instance of given module type: {type.AssemblyQualifiedName}");
            }

            Type = type;
            Assembly = type.Assembly;
            Instance = instance;

            _dependencies = new List<IAppModuleDescriptor>();
        }

        public Type Type { get; }

        public Assembly Assembly { get; }

        public IAppModule Instance { get; }

        public override string ToString()
        {
            return $"[AppModuleDescriptor {Type.FullName}]";
        }

        public void AddDependency(IAppModuleDescriptor descriptor)
        {
            _dependencies.AddIfNotContains(descriptor);
        }
    }
}