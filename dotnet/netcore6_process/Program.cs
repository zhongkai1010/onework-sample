// See https://aka.ms/new-console-template for more information


using System.Net.NetworkInformation;

Thread bt = new Thread(B.Run);

Thread ct = new Thread(C.Run);

bt.Start();
ct.Start();

//bt.Join();
//ct.Join();

Console.WriteLine(A.Count);

public class A
{
    public static int Count = 0;
}

public class B
{
    private static object o = new object();

    public static void Run()
    {
    
            for (int i = 0; i < 100; i++)
            {
                A.Count += 1;


                Console.WriteLine($"B:{A.Count}");
            }
       
    }
}

public class C
{
    public static void Run()
    {
        for (int i = 0; i < 100; i++)
        {
            A.Count -= 1;
            Console.WriteLine($"C:{A.Count}");
        }
    }
}