namespace netcore_design_patterns.BuilderPattern
{
    internal class Pepsi: ColdDrink
    {
        public override string name()
        {
            return "Pepsi";
        }

        public override float price()
        {
            return 35.0f;
        }
    }
}
