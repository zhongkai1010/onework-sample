using System.Threading.Tasks;
using OneWork.Contexts;

namespace OneWork.Interfaces
{
    public interface IPreConfigureServices
    {
        Task PreConfigureServicesAsync(ServiceConfigurationContext context);

        void PreConfigureServices(ServiceConfigurationContext context);
    }
}