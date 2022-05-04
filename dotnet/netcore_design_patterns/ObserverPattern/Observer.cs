namespace netcore_design_patterns.ObserverPattern;

public abstract class Observer
{
    protected Subject subject;

    protected Observer(Subject subject)
    {
        this.subject = subject;
    }

    public abstract void update();
}