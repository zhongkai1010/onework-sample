using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.BuilderPattern
{
    public interface Item
    {
        public String name();

        public Packing packing();

        public float price();
    }
}
