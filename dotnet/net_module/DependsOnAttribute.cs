using System;
using JetBrains.Annotations;

namespace OneWork
{
    public class DependsOnAttribute : Attribute, IDependedTypesProvider
    {
        [NotNull] public Type[] DependedTypes { get; }

        public DependsOnAttribute(params Type[] dependedTypes)
        {
            DependedTypes = dependedTypes ?? Type.EmptyTypes;
        }

        public Type[] GetDependedTypes()
        {
            return DependedTypes;
        }
    }
}