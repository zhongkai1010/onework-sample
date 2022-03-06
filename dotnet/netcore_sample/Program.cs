#nullable enable
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Xml;
using System.Xml.Serialization;

namespace OneWork
{
    public class Program
    {

        static void Main(string[] args)
        {
            //  string context = "<?xml version=\"1.0\"?><AliyunOSSConfig xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><Endpoint>http://oss-cn-shanghai.aliyuncs.com</Endpoint><AccessKeyId>AccessKeyId</AccessKeyId><AccessKeySecret>AccessKeySecret</AccessKeySecret><BucketName>BucketName</BucketName><RemovedFilesBucketName>RemovedFilesBucketName</RemovedFilesBucketName></AliyunOSSConfig>";
            string xml = File.ReadAllText("Crypt.xml");
       
            StringReader stringReader = new StringReader(xml);

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(A));

            A aliyunOssConfig =  xmlSerializer.Deserialize(stringReader) as A;


            stringReader.Close();

            Console.WriteLine(aliyunOssConfig.Crypts.Count);
        }

       
        public class A
        {
            [XmlElement("Crypt", IsNullable = false)]
            public List<Crypt> Crypts { get; set; }
        }

        public class Crypt
        {
            public string Table { get; set; }

            public string Column { get; set; }
        }

        public class AliyunOSSConfig 
        {
            public string BucketName { get; set; }

            public string Endpoint { get; set; }

            public string AccessKeyId { get; set; }

            public string AccessKeySecret { get; set; }

            public string RemovedFilesBucketName { get; set; }
        }
    }
}