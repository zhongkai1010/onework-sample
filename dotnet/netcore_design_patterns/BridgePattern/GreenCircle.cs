namespace netcore_design_patterns.BridgePattern;

public class GreenCircle : DrawAPI
{
    public void drawCircle(int radius, int x, int y)
    {
        Console.WriteLine("Drawing Circle[ color: green, radius: "
                          + radius + ", x: " + x + ", " + y + "]");
    }
}