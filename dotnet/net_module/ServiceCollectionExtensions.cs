using System;
using System.Collections.Generic;
using System.Text;
using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;

namespace OneWork
{
    public  static  class ServiceCollectionExtensions
    {
        public static void AddApplication<TStartupModule>( [NotNull] this IServiceCollection services)
            where TStartupModule : IAppModule
        {
            Console.WriteLine(typeof(TStartupModule));
        }
    }
}
