namespace netcore_design_patterns.ObserverPattern;

public class HexaObserver : Observer
{
    public HexaObserver(Subject subject) : base(subject)
    {
        this.subject = subject;
        this.subject.attach(this);
    }

    public override void update()
    {
        Console.WriteLine("Hex String:  " + subject.getState());
    }
}