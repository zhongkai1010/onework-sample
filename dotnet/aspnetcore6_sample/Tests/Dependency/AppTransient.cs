namespace Tests.Dependency
{
    public class AppTransient
    {

        public string Version { get;set; }

        public AppTransient()
        {
            Version = DateTime.Now.ToLongTimeString();
        }
    }
}
