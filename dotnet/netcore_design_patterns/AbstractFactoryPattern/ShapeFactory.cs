namespace netcore_design_patterns.AbstractFactoryPattern;

public class ShapeFactory : AbstractFactory
{
    public override Shape getShape(String shapeType)
    {
        return shapeType switch
        {
            null => null,
            "CIRCLE" => new Circle(),
            "RECTANGLE" => new Rectangle(),
            "SQUARE" => new Square(),
            _ => null
        };
    }

    public override Color getColor(String color)
    {
        return null;
    }
}