using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.BuilderPattern
{
    public abstract class Burger :Item
    {
        public abstract string name();
        

        public Packing packing()
        {
            return new Wrapper();
        }

        public abstract float price();
    }
}
