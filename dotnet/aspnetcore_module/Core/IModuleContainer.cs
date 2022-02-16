using System.Collections.Generic;
using JetBrains.Annotations;

namespace OneWork.Core
{
    public interface IModuleContainer 
    {
        [NotNull]
        IReadOnlyList<IAppModuleDescriptor> Modules { get; }
    }
}