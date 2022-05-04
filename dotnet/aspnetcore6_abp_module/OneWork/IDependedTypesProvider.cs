using System;
using JetBrains.Annotations;

namespace OneWork
{
    public interface IDependedTypesProvider
    {
        [NotNull]
        Type[] GetDependedTypes();
    }
}