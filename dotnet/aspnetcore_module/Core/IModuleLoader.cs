using System;
using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;

namespace OneWork.Core
{
    /// <summary>
    /// 模块加载处理接口
    /// </summary>
    public interface IModuleLoader
    {
        [NotNull]
        IAppModuleDescriptor[] LoadModules(
            [NotNull] IServiceCollection services,
            [NotNull] Type startupModuleType
        );
    }
}