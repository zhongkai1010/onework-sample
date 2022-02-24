namespace Tests.Dependency
{
    public class DefaultCache : ICache
    {
        public void Add(string key, string value)
        {
            Console.WriteLine("DefaultCache-Add");
        }

        public string Get(string key)
        {
            Console.WriteLine("DefaultCache-Get");
            return "";
        }
    }
}