using System;

namespace Tests
{
    public class AppTransient
    {

        public string Version { get;set; }

        public AppTransient()
        {
            Version = DateTime.Now.ToLongTimeString();
        }
    }
}
