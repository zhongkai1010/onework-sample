namespace netcore_design_patterns.AbstractFactoryPattern
{
    public interface Color
    {
        void fill();
    }

    public abstract class AbstractFactory
    {
        public abstract Color getColor(string color);
        public abstract Shape getShape(string shape);
    }
}