using System.Reflection;

namespace Modularity
{
    /// <summary>
    /// 模块描述类
    /// </summary>
    public interface IModuleDescriptor
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


        IReadOnlyList<IModuleDescriptor> Dependencies { get; }
    }
}
