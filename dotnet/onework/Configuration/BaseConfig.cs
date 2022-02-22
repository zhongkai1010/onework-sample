using Microsoft.Extensions.Configuration;

namespace Configuration
{
    public abstract class BaseConfig<T>
    {
        private const string ConfigPath = "ConfigPath";

        protected abstract string FileName { get; }

        public void Load(IConfiguration configuration)
        {
            var configPath = configuration[ConfigPath];

            var path = Path.Combine(Directory.GetCurrentDirectory(), configPath, FileName);

            if (!File.Exists(path))
            {
                throw new FileNotFoundException($"not find {FileName} file init config error");
            }

            Instance = Serializer.FromXmlFile<T>(path);
        }

        public T Instance { get;  set; }
    }
}