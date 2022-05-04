namespace Tests.Dependency
{
    public class AppScoped  
    {
        public string Version { get; set; }

        public AppScoped()
        {
            Version = DateTime.Now.ToLongTimeString();
        }
    }
}
