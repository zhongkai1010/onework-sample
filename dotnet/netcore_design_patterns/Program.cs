// See https://aka.ms/new-console-template for more information


#region Adapter Pattern

//AudioPlayer audioPlayer = new AudioPlayer();

//audioPlayer.play("mp3", "beyond the horizon.mp3");
//audioPlayer.play("mp4", "alone.mp4");
//audioPlayer.play("vlc", "far far away.vlc");
//audioPlayer.play("avi", "mind me.avi");

#endregion

#region Bridge Pattern

using netcore_design_patterns.BridgePattern;

Shape redCircle = new Circle(100, 100, 10, new RedCircle());

Shape greenCircle = new Circle(100, 100, 10, new GreenCircle());

redCircle.draw();

greenCircle.draw();

#endregion