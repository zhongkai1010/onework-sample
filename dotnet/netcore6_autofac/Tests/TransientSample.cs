namespace Tests
{
    public class TransientSample : ISample
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