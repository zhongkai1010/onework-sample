using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;

namespace Tests.Configuration
{
    public class VideosWatcher : IHostedService
    {
        private static readonly string _fileFilter = Path.Combine("Config", "AliyunOSS.xml");


        public Task StartAsync(CancellationToken cancellationToken)
        {
            ChangeToken.OnChange(() =>
            {
                IFileProvider _fileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory());
                IChangeToken token = _fileProvider.Watch(_fileFilter);
                return token;
            }, () => { Console.WriteLine("文件改动了"); });


            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}