using Modularity;

namespace Tests
{
    public class Module1 : AppModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Console.WriteLine("Module1-ConfigureServices");

            // Add services to the container.
            context.Services.AddControllersWithViews();
        }
    }
}
