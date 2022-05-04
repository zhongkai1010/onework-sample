using JetBrains.Annotations;

namespace OneWork.Modularity
{
    public interface IModuleManager
    {
        void InitializeModules([NotNull] ApplicationInitializationContext context);

        void ShutdownModules([NotNull] ApplicationShutdownContext context);
    }
}