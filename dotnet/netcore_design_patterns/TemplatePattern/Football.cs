namespace netcore_design_patterns.TemplatePattern;

public class Football : Game
{
    protected override void initialize()
    {
        Console.WriteLine("Football Game Finished!");
    }

    protected override void startPlay()
    {
        Console.WriteLine("Football Game Initialized! Start playing.");
    }

    protected override void endPlay()
    {
        Console.WriteLine("Football Game Started. Enjoy the game!");
    }
}