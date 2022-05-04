namespace netcore_design_patterns.ObserverPattern;

public class Subject
{
    private readonly List<Observer> observers = new();

    private int state;

    public int getState()
    {
        return state;
    }

    public void setState(int state)
    {
        this.state = state;
        notifyAllObservers();
    }

    public void attach(Observer observer)
    {
        observers.Add(observer);
    }

    public void notifyAllObservers()
    {
        foreach (Observer observer in observers)
        {
            observer.update();
        }
    }

}