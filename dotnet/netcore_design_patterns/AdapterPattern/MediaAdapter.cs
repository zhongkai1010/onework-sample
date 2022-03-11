namespace netcore_design_patterns.AdapterPattern;

public class MediaAdapter : MediaPlayer
{
    readonly AdvancedMediaPlayer advancedMusicPlayer;


    public MediaAdapter(string audioType)
    {
        if (audioType.Equals("vlc"))
        {
            advancedMusicPlayer = new VlcPlayer();
        }
        else if (audioType.Equals("mp4"))
        {
            advancedMusicPlayer = new Mp4Player();
        }
    }

    public void play(string audioType, string fileName)
    {
        if (audioType.Equals("vlc"))
        {
            advancedMusicPlayer.playVlc(fileName);
        }
        else if (audioType.Equals("mp4"))
        {
            advancedMusicPlayer.playMp4(fileName);
        }
    }
}