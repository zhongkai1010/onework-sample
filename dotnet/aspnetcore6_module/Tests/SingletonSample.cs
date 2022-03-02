using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DependencyInjection;

namespace Tests
{
    public class SingletonSample : ISingletonDependency
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
