using JetBrains.Annotations;

namespace OneWork.Modularity
{
    public interface IOnPreApplicationInitialization
    {
        void OnPreApplicationInitialization([NotNull] ApplicationInitializationContext context);
    }
}