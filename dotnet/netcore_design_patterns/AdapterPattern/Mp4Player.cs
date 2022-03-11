namespace netcore_design_patterns.AdapterPattern;

public class Mp4Player : AdvancedMediaPlayer
{
    public void playVlc(string fileName)
    {
        throw new NotImplementedException();
    }

    public void playMp4(string fileName)
    {
        Console.WriteLine("Playing mp4 file. Name: " + fileName);
    }
}