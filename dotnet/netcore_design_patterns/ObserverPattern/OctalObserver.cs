namespace netcore_design_patterns.ObserverPattern;

public class OctalObserver : Observer
{
    public OctalObserver(Subject subject) : base(subject)
    {
        this.subject = subject;
        this.subject.attach(this);
    }

    public override void update()
    {
        Console.WriteLine("Octal String: " + subject.getState());
    }
}