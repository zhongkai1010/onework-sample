namespace netcore_design_patterns.BridgePattern;

public class RedCircle : DrawAPI
{
    public void drawCircle(int radius, int x, int y)
    {
        Console.WriteLine("Drawing Circle[ color: red, radius: "
                          + radius + ", x: " + x + ", " + y + "]");
    }
}