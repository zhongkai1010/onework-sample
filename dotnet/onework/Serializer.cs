using System;
using System.IO;
using System.Text;
using System.Xml.Serialization;

public static class Serializer
{
    public static string ToXml(object obj)
    {
        if (obj == null)
        {
            return null;
        }

        StringBuilder sb = new StringBuilder();
        using (StringWriter sw = new StringWriter(sb))
        {
            XmlSerializer serializer = new XmlSerializer(obj.GetType());
            serializer.Serialize(sw, obj);
        }

        return sb.ToString();
    }

    public static T FromXml<T>(string xml)
    {
        if (string.IsNullOrEmpty(xml))
        {
            return default(T);
        }

        using (StringReader sr = new StringReader(xml))
        {
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            T obj = (T)serializer.Deserialize(sr);
            return obj;
        }
    }

    public static T FromXmlFile<T>(string xmlFilePath)
    {
        if (!File.Exists(xmlFilePath))
        {
            return default(T);
        }

        using (FileStream fs = new FileStream(xmlFilePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
        {
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            return (T)serializer.Deserialize(fs);
        }
    }

    public static bool ToXmlFile(object obj, string filename)
    {
        using (FileStream fs = new FileStream(filename, FileMode.Create, FileAccess.Write, FileShare.ReadWrite))
        {
            XmlSerializer serializer = new XmlSerializer(obj.GetType());
            serializer.Serialize(fs, obj);

            return true;
        }
    }
}