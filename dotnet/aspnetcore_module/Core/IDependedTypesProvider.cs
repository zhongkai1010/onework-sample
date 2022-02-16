using System;
using JetBrains.Annotations;

namespace OneWork.Core
{
    public interface IDependedTypesProvider
    {
        [NotNull]
        Type[] GetDependedTypes();
    }
}