using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.BuilderPattern
{
    internal class MealBuilder
    {
        public Meal prepareVegMeal()
        {
            Meal meal = new Meal();
            meal.addItem(new VegBurger());
            meal.addItem(new Coke());
            return meal;
        }

        public Meal prepareNonVegMeal()
        {
            Meal meal = new Meal();
            meal.addItem(new ChickenBurger());
            meal.addItem(new Pepsi());
            return meal;
        }
    }
}