namespace Tests;

public class RoleRepository : IRoleRepository
{
    public void Insert(Role t)
    {
        Console.WriteLine("RoleRepository - Insert");
    }

    public void Update(Role t)
    {
        Console.WriteLine("RoleRepository - Update");
    }
}