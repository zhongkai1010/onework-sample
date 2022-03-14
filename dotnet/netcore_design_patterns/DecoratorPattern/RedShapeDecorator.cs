namespace netcore_design_patterns.DecoratorPattern
{
    public  class RedShapeDecorator: ShapeDecorator
    {
        public RedShapeDecorator(Shape decoratedShape) : base(decoratedShape)
        {
        }

        public override void draw()
        {
            decoratedShape.draw();
            setRedBorder();
        }

        private void setRedBorder()
        {
            Console.WriteLine("Border Color: Red");
        }
    }
}
