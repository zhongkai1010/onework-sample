namespace OneWork.Modularity
{
    public abstract class ModuleLifecycleContributorBase : IModuleLifecycleContributor
    {
        public virtual void Initialize(ApplicationInitializationContext context, IAppModule module)
        {
        }

        public virtual void Shutdown(ApplicationShutdownContext context, IAppModule module)
        {
        }
    }
}