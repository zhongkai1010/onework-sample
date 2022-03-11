namespace netcore_design_patterns.BridgePattern;

public class Circle : Shape
{
    private readonly int x;
    private readonly int y;
    private readonly int radius;

    public Circle(int x, int y, int radius, DrawAPI drawAPI) : base(drawAPI)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public override void draw()
    {
        drawAPI.drawCircle(radius, x, y);
    }
}