namespace netcore_design_patterns.Singleton_Pattern
{
    public class SingleObject
    {
        private static readonly object locker = new object();

        //创建 SingleObject 的一个对象
        private static SingleObject instance = null;

        //让构造函数为 private，这样该类就不会被实例化
        private SingleObject()
        {
        }

        //获取唯一可用的对象
        public static SingleObject getInstance()
        {
            if (instance == null)
            {
                lock (locker)
                {
                    if (instance == null)
                    {
                        instance = new SingleObject();
                    }
                }
            }
            return instance;
        }

        public void showMessage()
        {
            Console.WriteLine("Hello World!");
        }
    }
}