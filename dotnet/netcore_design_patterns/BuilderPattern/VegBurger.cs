using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.BuilderPattern
{
    public class VegBurger: Burger
    {
        public override string name()
        {
            return "Veg Burger";
        }

        public override float price()
        {
            return 25.0f;
        }
    }
}
