using JetBrains.Annotations;
using OneWork.DependencyInjection;

namespace OneWork.Modularity
{
    public interface IModuleLifecycleContributor : ITransientDependency
    {
        void Initialize([NotNull] ApplicationInitializationContext context, [NotNull] IAppModule module);

        void Shutdown([NotNull] ApplicationShutdownContext context, [NotNull] IAppModule module);
    }
}
