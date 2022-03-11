namespace netcore_design_patterns.AdapterPattern;

public class VlcPlayer : AdvancedMediaPlayer
{
    public void playVlc(string fileName)
    {
        Console.WriteLine("Playing vlc file. Name: " + fileName);
    }

    public void playMp4(string fileName)
    {
        throw new NotImplementedException();
    }
}