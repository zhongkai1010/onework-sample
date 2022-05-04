using System;
using System.Collections.Generic;
using System.Reflection;

namespace OneWork.Modularity
{
    /// <summary>
    /// 模块描述类
    /// </summary>
    public interface IAppModuleDescriptor
    {
        /// <summary>
        /// 模块类型
        /// </summary>
        Type Type { get; }

        /// <summary>
        /// 模块类所在应用程序集
        /// </summary>
        Assembly Assembly { get; }

        /// <summary>
        /// 模块实例化对象
        /// </summary>
        IAppModule Instance { get; }

        /// <summary>
        /// 依赖模块描述细腻些
        /// </summary>
        IReadOnlyList<IAppModuleDescriptor> Dependencies { get; }
    }
}
