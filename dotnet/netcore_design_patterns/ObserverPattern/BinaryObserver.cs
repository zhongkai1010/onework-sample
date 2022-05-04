namespace netcore_design_patterns.ObserverPattern;

public class BinaryObserver : Observer
{
    public BinaryObserver(Subject subject) : base(subject)
    {
        this.subject = subject;
        this.subject.attach(this);
    }

    public override void update()
    {
        Console.WriteLine("Binary String: " + subject.getState());
    }
}