using System;
using JetBrains.Annotations;

namespace OneWork
{
    public interface IApplicationWithExternalServiceProvider : IApplication
    {
        void Initialize([NotNull] IServiceProvider serviceProvider);
    }
}