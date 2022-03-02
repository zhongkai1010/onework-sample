using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Reflection;
using System.Reflection;

namespace Configuration
{
    public class ConfigFileWatcher : IHostedService
    {
        private readonly IFileProvider _fileProvider;

        private readonly AppSettings _appSettings;

        private readonly IServiceProvider _serviceProvider;

        private readonly ITypeFinder _typeFinder;

        public ConfigFileWatcher(IOptions<AppSettings> options,
            IServiceProvider serviceProvider, ITypeFinder typeFinder)
        {
            _serviceProvider = serviceProvider;
            _typeFinder = typeFinder;
            _appSettings = options.Value;
            _fileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory());
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            LoadTypes(type =>
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

        private void LoadTypes(Action<Type> action)
        {
            List<Type> types = new();

            ServiceCollectionConfigurationExtensions.GetBaseConfigTypes(types, _typeFinder.Types.ToArray());

            foreach (Type type in types)
            {
                action(type);
            }
        }

        private string GetFilePath(Type type, object config)
        {
            var fileName = (string)type.InvokeMember("FileName", BindingFlags.GetProperty, null, config, null);

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
                    type.InvokeMember("Load", BindingFlags.InvokeMethod, null, config, new object[] { _appSettings });
                });
        }
    }
}