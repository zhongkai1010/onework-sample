namespace Tests
{
    public interface ICache
    {
        void Add(string key, string value);

        string Get(string key);
    }
}
