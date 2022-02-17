using JetBrains.Annotations;

namespace OneWork.Modularity
{
    public interface IOnPostApplicationInitialization
    {
        void OnPostApplicationInitialization([NotNull] ApplicationInitializationContext context);
    }
}