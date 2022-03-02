using DependencyInjection;

namespace Tests
{
    public class TransientSample : ITransientDependency
    {
        public void Dispose()
        {
            Console.WriteLine("TransientSample-Dispose");
        }

        public void Output()
        {
            Console.WriteLine("TransientSample-Output");
        }
    }
}