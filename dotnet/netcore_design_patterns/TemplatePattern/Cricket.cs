namespace netcore_design_patterns.TemplatePattern;

public class Cricket : Game
{
    protected override void initialize()
    {
        Console.WriteLine("Cricket Game Finished!");
    }

    protected override void startPlay()
    {
        Console.WriteLine("Cricket Game Initialized! Start playing.");
    }

    protected override void endPlay()
    {
        Console.WriteLine("Cricket Game Started. Enjoy the game!");
    }
}