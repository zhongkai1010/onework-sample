using System;

namespace OneWork.Code
{
    public abstract class BaseRepository : IRepository
    {
        public void Add()
        {
            Console.WriteLine("BaseRepository_Add");
        }
    }
}