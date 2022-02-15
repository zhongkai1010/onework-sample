using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OneWork.Contexts;
using OneWork.Interfaces;

namespace OneWork
{
   public  class Module :
        IModule,
        IOnPreApplicationInitialization,
        IOnApplicationInitialization,
        IOnPostApplicationInitialization,
        IOnApplicationShutdown,
        IPreConfigureServices,
        IPostConfigureServices
    {
        public Task ConfigureServicesAsync(ServiceConfigurationContext context)
        {
            throw new NotImplementedException();
        }

        public void ConfigureServices(ServiceConfigurationContext context)
        {
            throw new NotImplementedException();
        }

        public Task OnPreApplicationInitializationAsync(ApplicationInitializationContext context)
        {
            throw new NotImplementedException();
        }

        public void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            throw new NotImplementedException();
        }

        public Task OnApplicationInitializationAsync(ApplicationInitializationContext context)
        {
            throw new NotImplementedException();
        }

        public void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            throw new NotImplementedException();
        }

        public Task OnPostApplicationInitializationAsync(ApplicationInitializationContext context)
        {
            throw new NotImplementedException();
        }

        public void OnPostApplicationInitialization(ApplicationInitializationContext context)
        {
            throw new NotImplementedException();
        }

        public Task OnApplicationShutdownAsync(ApplicationShutdownContext context)
        {
            throw new NotImplementedException();
        }

        public void OnApplicationShutdown(ApplicationShutdownContext context)
        {
            throw new NotImplementedException();
        }

        public Task PreConfigureServicesAsync(ServiceConfigurationContext context)
        {
            throw new NotImplementedException();
        }

        public void PreConfigureServices(ServiceConfigurationContext context)
        {
            throw new NotImplementedException();
        }

        public Task PostConfigureServicesAsync(ServiceConfigurationContext context)
        {
            throw new NotImplementedException();
        }

        public void PostConfigureServices(ServiceConfigurationContext context)
        {
            throw new NotImplementedException();
        }
    }
}
