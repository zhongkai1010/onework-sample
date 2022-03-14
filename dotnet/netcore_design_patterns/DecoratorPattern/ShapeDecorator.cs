namespace netcore_design_patterns.DecoratorPattern
{
    public abstract class  ShapeDecorator: Shape
    {
        protected Shape decoratedShape;

        protected ShapeDecorator(Shape decoratedShape)
        {
            this.decoratedShape = decoratedShape;
        }


        public virtual void draw()
        {
            decoratedShape.draw();
        }
    }
}
