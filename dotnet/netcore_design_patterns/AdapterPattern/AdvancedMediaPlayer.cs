namespace netcore_design_patterns.AdapterPattern;

public interface AdvancedMediaPlayer
{
    public void playVlc(String fileName);
    public void playMp4(String fileName);
}