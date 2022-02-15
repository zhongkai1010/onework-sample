using System.Threading.Tasks;
using OneWork.Contexts;

namespace OneWork.Interfaces
{
    public interface IModule
    {
        Task ConfigureServicesAsync(ServiceConfigurationContext context);

        void ConfigureServices(ServiceConfigurationContext context);
    }
}