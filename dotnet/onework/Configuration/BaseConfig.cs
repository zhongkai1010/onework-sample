using JetBrains.Annotations;

namespace Configuration
{
    public abstract class BaseConfig<T> where T : new()
    {
        public abstract string FileName { get; }

        [NotNull]
        protected T _t = default!;

        public void Load(AppSettings appSettings)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), appSettings.ConfigPath, FileName);

            if (!File.Exists(path))
            {
                throw new FileNotFoundException($"not find {FileName} file init config error");
            }

            _t = Serializer.FromXmlFile<T>(path);
        }

        public T Instance
        {
            get
            {
                if (_t == null)
                {
                    throw new Exception($"load {FileName} error");
                }

                return _t;
            }
        }
    }
}