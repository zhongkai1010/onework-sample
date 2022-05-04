using System;
using Microsoft.Extensions.DependencyInjection;
using OneWork.Modularity;

namespace OneWork
{
    public interface IApplication : IModuleContainer, IDisposable
    {
       
        Type StartupModuleType { get; }

        IServiceCollection Services { get; }

        IServiceProvider ServiceProvider { get; }

        void Shutdown();
    }
}