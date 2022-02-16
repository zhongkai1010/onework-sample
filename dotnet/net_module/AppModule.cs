using System.Text;

namespace OneWork
{
    public abstract class AppModule:IAppModule
    {
        public virtual void ConfigureServices(ServiceConfigurationContext context)
        {

        }
    }
}