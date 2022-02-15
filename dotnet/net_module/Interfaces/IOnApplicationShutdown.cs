using System.Threading.Tasks;
using JetBrains.Annotations;
using OneWork.Contexts;

namespace OneWork.Interfaces
{
    public interface IOnApplicationShutdown
    {
        Task OnApplicationShutdownAsync([NotNull] ApplicationShutdownContext context);

        void OnApplicationShutdown([NotNull] ApplicationShutdownContext context);
    }
}