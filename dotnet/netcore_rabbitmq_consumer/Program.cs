using System;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace OneWork
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine("Start");
            IConnectionFactory connFactory = new ConnectionFactory//创建连接工厂对象
            {
                HostName = "192.168.85.103",//IP地址
                Port = 5672,//端口号
                UserName = "admin",//用户账号
                Password = "123456"//用户密码
            };
            using IConnection conn = connFactory.CreateConnection();
            using IModel channel = conn.CreateModel();
            var queueName = args.Length > 0 ? args[0] : "queue1";
            //声明一个队列
            channel.QueueDeclare(
                queueName,//消息队列名称
                false,//是否缓存
                false,
                false,
                null
            );
            //创建消费者对象
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                ReadOnlyMemory<byte> message = ea.Body;//接收到的消息
                Console.WriteLine("接收到信息为:" + Encoding.UTF8.GetString(message.ToArray()));
            };
            //消费者开启监听
            channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);
            Console.ReadKey();
        }
    }
}

