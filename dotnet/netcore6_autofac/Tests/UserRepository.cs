namespace Tests;

public class UserRepository : IUserRepository
{
    public void Insert(User t)
    {
        Console.WriteLine("UserRepository - Insert");
    }

    public void Update(User t)
    {
        Console.WriteLine("UserRepository - Update");
    }
}