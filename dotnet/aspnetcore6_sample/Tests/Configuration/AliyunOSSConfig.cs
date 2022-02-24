using Configuration;

namespace Tests.Configuration
{
    public class AliyunOSSConfig : BaseConfig<AliyunOSSConfig>
    {
        public string BucketName { get; set; }

        public string Endpoint { get; set; }

        public string AccessKeyId { get; set; }

        public string AccessKeySecret { get; set; }

        public string RemovedFilesBucketName { get; set; }

        public override string FileName => "AliyunOSS.xml";
    }
}