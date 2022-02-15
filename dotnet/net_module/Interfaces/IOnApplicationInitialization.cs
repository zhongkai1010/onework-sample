using System.Threading.Tasks;
using JetBrains.Annotations;

namespace OneWork.Interfaces
{
    public interface IOnApplicationInitialization
    {
        Task OnApplicationInitializationAsync([NotNull] ApplicationInitializationContext context);

        void OnApplicationInitialization([NotNull] ApplicationInitializationContext context);
    }
}