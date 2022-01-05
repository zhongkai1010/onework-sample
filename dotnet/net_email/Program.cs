using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace net_email
{
    class Program
    {
        static void Main(string[] args)
        {


            try
            {
                MailAddress receiver = new MailAddress("zhongkai1010@163.com");
                MailAddress sender = new MailAddress("kai.zhong@*********.com");
                MailMessage message = new MailMessage();
                message.From = sender;//发件人
                message.To.Add(receiver);//收件人
                //message.CC.Add(sender);//抄送人
                message.Subject = "测试标题";//标题
                message.Body = "测试内容";//内容
                message.IsBodyHtml = true;//是否支持内容为HTML

                SmtpClient client = new SmtpClient();
                client.Host = "smtp.exmail.qq.com";
                // client.Port = 465;
                client.EnableSsl = true;//是否启用SSL
                //client.Timeout = 10000;//超时
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                // client.UseDefaultCredentials = true;
                client.Credentials = new NetworkCredential("kai.zhong@wetrial.com", "*********");
                client.Send(message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);

            }
        }
    }
}
