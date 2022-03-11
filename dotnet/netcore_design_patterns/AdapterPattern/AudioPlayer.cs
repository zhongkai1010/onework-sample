// See https://aka.ms/new-console-template for more information

namespace netcore_design_patterns.AdapterPattern;

public class AudioPlayer : MediaPlayer
{
    private MediaAdapter mediaAdapter = null!;

    public void play(string audioType, string fileName)
    {
        //播放 mp3 音乐文件的内置支持
        if (audioType.Equals("mp3"))
        {
            Console.WriteLine("Playing mp3 file. Name: " + fileName);
        }
        //mediaAdapter 提供了播放其他文件格式的支持
        else if (audioType.Equals("vlc") || audioType.Equals("mp4"))
        {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        }
        else
        {
            Console.WriteLine("Invalid media. " +
                              audioType + " format not supported");
        }
    }
}