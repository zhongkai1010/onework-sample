using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.BuilderPattern
{
    internal class Meal
    {
        private readonly List<Item> items = new();

        public void addItem(Item item)
        {
            items.Add(item);
        }


        public float getCost()
        {
            float cost = 0.0f;
            foreach (Item item in items)
            {
                cost += item.price();
            }

            return cost;
        }

        public void showItems()
        {
            foreach (Item item in items)
            {
                Console.WriteLine("Item : " + item.name());
                Console.WriteLine(", Packing : " + item.packing().pack());
                Console.WriteLine(", Price : " + item.price());
            }
        }
    }
}