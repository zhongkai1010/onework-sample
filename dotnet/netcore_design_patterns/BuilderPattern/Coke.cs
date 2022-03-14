using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.BuilderPattern
{
    internal class Coke: ColdDrink
    {
        public override string name()
        {
            return "Coke";
        }

        public override float price()
        {
            return 30.0f;
        }
    }
}
