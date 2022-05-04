using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class SingletonSample : ISample
    {
        public void Dispose()
        {
            Console.WriteLine("SingletonSample-Dispose");
        }

        public void Output()
        {
            Console.WriteLine("SingletonSample-Output");
        }
    }
}
