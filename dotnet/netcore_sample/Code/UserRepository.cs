using System;

namespace OneWork.Code
{
    public class UserRepository : IRepository
    {
        public void Add()
        {
            Console.WriteLine("UserRepository_Add");
        }
    }
}