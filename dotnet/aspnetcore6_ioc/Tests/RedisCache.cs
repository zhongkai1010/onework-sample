using System;

namespace Tests
{
    public class RedisCache : ICache
    {
        private IRedisOperate _redisOperate;

        public RedisCache(IRedisOperate redisOperate)
        {
            _redisOperate = redisOperate;
        }

        public void Add(string key, string value)
        {
            Console.WriteLine("RedisCache-Add");
        }

        public string Get(string key)
        {
            Console.WriteLine("RedisCache-Get");
            return _redisOperate.Get(key);
        }
    }
}