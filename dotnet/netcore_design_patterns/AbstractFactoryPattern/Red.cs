namespace netcore_design_patterns.AbstractFactoryPattern;

public class Red : Color
{
    public void fill()
    {
        Console.WriteLine("Inside Red::fill() method.");
    }
}