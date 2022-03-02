namespace Tests
{
    public class ConsoleLogger : ILogger
    {
        public void Info()
        {
            Console.WriteLine("Info");
        }

        public void Error()
        {
            Console.WriteLine("Error");
        }

        public void Debug()
        {
            Console.WriteLine("Debug");
        }
    }
}
