using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.DecoratorPattern
{
    public class Circle: Shape
    {
        public void draw()
        {
            Console.WriteLine("Shape: Circle");
        }
    }
}
