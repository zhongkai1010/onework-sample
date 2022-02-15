using System.Threading.Tasks;
using OneWork.Contexts;

namespace OneWork.Interfaces
{
    public interface IPostConfigureServices
    {
        Task PostConfigureServicesAsync(ServiceConfigurationContext context);

        void PostConfigureServices(ServiceConfigurationContext context);
    }
}