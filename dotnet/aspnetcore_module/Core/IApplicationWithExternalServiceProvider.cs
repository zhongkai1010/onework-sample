using System;
using JetBrains.Annotations;

namespace OneWork.Core
{
    public interface IApplicationWithExternalServiceProvider : IAbpApplication
    {
        void Initialize([NotNull] IServiceProvider serviceProvider);
    }
}