using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;

namespace Modularity
{
    public interface IModuleLoader
    {
        [NotNull]
        IModuleDescriptor[] LoadModules(
            [NotNull] IServiceCollection services,
            [NotNull] Type startupModuleType
        );
    }
}