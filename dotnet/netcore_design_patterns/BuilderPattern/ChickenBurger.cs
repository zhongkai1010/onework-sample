namespace netcore_design_patterns.BuilderPattern
{
    public class ChickenBurger : Burger
    {
        public override string name()
        {
            return "Chicken Burger";
        }

        public override float price()
        {
            return 50.5f;
        }
    }
}
