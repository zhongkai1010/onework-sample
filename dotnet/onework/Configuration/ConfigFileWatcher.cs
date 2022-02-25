using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Modularity;

namespace Configuration
{
    public class ConfigFileWatcher : IHostedService
    {
        private readonly IFileProvider _fileProvider;

        private readonly IModuleContainer _moduleContainer;

        private readonly AppSettings _appSettings;

        private readonly IServiceProvider _serviceProvider;

        public ConfigFileWatcher(IModuleContainer moduleContainer, IOptions<AppSettings> options,
            IServiceProvider serviceProvider)
        {
            _moduleContainer = moduleContainer;
            _serviceProvider = serviceProvider;
            _appSettings = options.Value;
            _fileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory());
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            List<Type> types = new List<Type>();

            LoadTypes(types, type =>
            {
                var config = _serviceProvider.GetRequiredService(type);

                CreateChangeToken(type, config);
            });

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private void LoadTypes(List<Type> types, Action<Type> action)
        {
            IReadOnlyList<IModuleDescriptor> modules = _moduleContainer.Modules;

            foreach (IModuleDescriptor module in modules)
            {
                ConfigurationServiceCollectionExtensions.GetBaseConfigTypes(types, module.Assembly.GetExportedTypes());
            }

            foreach (Type type in types)
            {
                action(type);
            }
        }

        private string GetFilePath(Type type, object config)
        {
            var fileName = (string) type.InvokeMember("FileName", BindingFlags.GetProperty, null, config, null);

            string fileFilter = Path.Combine(_appSettings.ConfigPath, fileName);

            return fileFilter;
        }

        private void CreateChangeToken(Type type, object config)
        {
            string fileFilter = GetFilePath(type, config);

            ChangeToken.OnChange(() =>
                {
                    IChangeToken token = _fileProvider.Watch(fileFilter);
                    return token;
                },
                () =>
                {
                    type.InvokeMember("Load", BindingFlags.InvokeMethod, null, config, new object[] {_appSettings});
                });
        }
    }
}