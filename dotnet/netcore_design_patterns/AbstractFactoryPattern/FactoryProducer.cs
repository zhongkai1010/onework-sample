namespace netcore_design_patterns.AbstractFactoryPattern
{
    public class FactoryProducer
    {
        public static AbstractFactory getFactory(String choice)
        {
            return choice switch
            {
                "SHAPE" => new ShapeFactory(),
                "COLOR" => new ColorFactory(),
                _ => null
            };
        }
    }
}
