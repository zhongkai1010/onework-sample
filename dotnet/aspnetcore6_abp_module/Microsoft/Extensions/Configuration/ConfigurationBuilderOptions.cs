﻿namespace Microsoft.Extensions.Configuration
{
    public class ConfigurationBuilderOptions
    {
        /// <summary>
        /// Default value: "appsettings".
        /// </summary>
        public string FileName { get; set; } = "appsettings";

        /// <summary>
        /// Environment name. Generally used "Development", "Staging" or "Production".
        /// </summary>
        public string EnvironmentName { get; set; }

        /// <summary>
        /// Base path to read the configuration file indicated by <see cref="FileName"/>.
        /// </summary>
        public string BasePath { get; set; }

        /// <summary>
        /// Prefix for the environment variables.
        /// </summary>
        public string EnvironmentVariablesPrefix { get; set; }

        /// <summary>
        /// Command line arguments.
        /// </summary>
        public string[] CommandLineArgs { get; set; }
    }
}
