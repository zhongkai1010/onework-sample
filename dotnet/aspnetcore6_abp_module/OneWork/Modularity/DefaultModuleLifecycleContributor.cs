namespace OneWork.Modularity
{
    public class OnApplicationInitializationModuleLifecycleContributor : ModuleLifecycleContributorBase
    {
        public override void Initialize(ApplicationInitializationContext context, IAppModule module)
        {
            (module as IOnApplicationInitialization)?.OnApplicationInitialization(context);
        }
    }

    public class OnApplicationShutdownModuleLifecycleContributor : ModuleLifecycleContributorBase
    {
        public override void Shutdown(ApplicationShutdownContext context, IAppModule module)
        {
            (module as IOnApplicationShutdown)?.OnApplicationShutdown(context);
        }
    }

    public class OnPreApplicationInitializationModuleLifecycleContributor : ModuleLifecycleContributorBase
    {
        public override void Initialize(ApplicationInitializationContext context, IAppModule module)
        {
            (module as IOnPreApplicationInitialization)?.OnPreApplicationInitialization(context);
        }
    }

    public class OnPostApplicationInitializationModuleLifecycleContributor : ModuleLifecycleContributorBase
    {
        public override void Initialize(ApplicationInitializationContext context, IAppModule module)
        {
            (module as IOnPostApplicationInitialization)?.OnPostApplicationInitialization(context);
        }
    }
}