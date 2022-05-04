namespace netcore_design_patterns.AbstractFactoryPattern;

public class ColorFactory : AbstractFactory
{
    public override Color getColor(string color)
    {
        return color switch
        {
            null => null,
            "RED" => new Red(),
            "GREEN" => new Green(),
            "BLUE" => new Blue(),
            _ => null
        };
    }

    public override Shape getShape(string shape)
    {
        return null;
    }
}