using System;
using System.Text;
using RabbitMQ.Client;

namespace OneWork
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine("Start");
            IConnectionFactory conFactory = new ConnectionFactory//创建连接工厂对象
            {
                HostName = "192.168.85.103",//IP地址
                Port = 5672,//端口号
                UserName = "admin",//用户账号
                Password = "123456"//用户密码
            };
            using IConnection con = conFactory.CreateConnection();
            using IModel channel = con.CreateModel();
            var queueName = args.Length > 0 ? args[0] : "queue1";
            //声明一个队列
            channel.QueueDeclare(
                queueName,//消息队列名称
                false,//是否缓存
                false,
                false,
                null
            );
            while (true)
            {
                Console.WriteLine("消息内容:");
                String message = Console.ReadLine();
                //消息内容
                if (message != null)
                {
                    byte[] body = Encoding.UTF8.GetBytes(message);
                    //发送消息
                    channel.BasicPublish("", queueName, null, body);
                }

                Console.WriteLine("成功发送消息:" + message);
            }
        }
    }
}
