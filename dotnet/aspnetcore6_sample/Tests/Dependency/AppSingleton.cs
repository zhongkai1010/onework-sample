namespace Tests.Dependency
{
    public class AppSingleton
    {
        public string Version { get;set; }

        public AppSingleton()
        {
            Version = DateTime.Now.ToLongTimeString();
        }
    }
}
