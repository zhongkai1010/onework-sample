//#nullable enable
//using System;
//using System.Threading;

//namespace OneWork
//{
//    public class Program
//    {

//        static void Main(string[] args)
//        {

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread),11);

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread), 7);

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread), 13);

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread), 17);

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread), 26);

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread), 32);

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread), 46);

//            ThreadPool.QueueUserWorkItem(new WaitCallback(RunThread), 57);

//            Console.Read();
//        }

//        private static void RunThread(object? state)
//        {
//            if (state == null) return;
//            int second = (int) state;

//            Console.WriteLine($"RunThread:{second}");

//            while (true)
//            {
//                DateTime dateTime = DateTime.Now;

//                if (dateTime.Second % second == 0)
//                {
//                    Console.WriteLine($" End RunThread:{second}");
//                    break;
//                }

//                Console.WriteLine($"RunThread:{second}，{dateTime:yyyy-MM-dd HH:mm:ss}");

//                Thread.Sleep(1000);
//            }
//        }

 
//    }
//}