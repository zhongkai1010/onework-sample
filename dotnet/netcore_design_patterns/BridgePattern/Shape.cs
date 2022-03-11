namespace netcore_design_patterns.BridgePattern;

public abstract class Shape
{
    protected DrawAPI drawAPI;

    protected Shape(DrawAPI drawAPI)
    {
        this.drawAPI = drawAPI;
    }

    public abstract void draw();
}