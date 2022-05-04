using OneWork.DependencyInjection;

namespace Tests
{
    public interface IUserRepository : ITransientDependency
    {
        void Add();
    }
}