using System;

namespace Tests
{
    public class UserRepository : IUserRepository
    {
        public void Add()
        {
            Console.WriteLine("UserRepository-Add");
        }
    }
}