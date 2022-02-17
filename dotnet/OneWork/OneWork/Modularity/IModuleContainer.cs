using System.Collections.Generic;
using JetBrains.Annotations;

namespace OneWork.Modularity
{
    public interface IModuleContainer 
    {
        [NotNull]
        IReadOnlyList<IAppModuleDescriptor> Modules { get; }
    }
}