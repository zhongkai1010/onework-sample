namespace Tests
{
    public interface IRepository<T>
    {
        void Insert(T t);

        void Update(T t);
    }
}