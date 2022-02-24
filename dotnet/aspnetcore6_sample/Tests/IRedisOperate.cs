namespace Tests
{
    public interface IRedisOperate
    {
        string Get(string key);
    }

    public class RedisOperate: IRedisOperate
    {
        public string Get(string key)
        {
            return "RedisOperate-get";
        }
    }
}
