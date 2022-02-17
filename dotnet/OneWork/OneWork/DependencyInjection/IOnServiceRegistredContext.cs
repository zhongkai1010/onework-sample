using OneWork.Collections;
using OneWork.DynamicProxy;
using System;

namespace OneWork.DependencyInjection
{
    public interface IOnServiceRegistredContext
    {
        ITypeList<IAppInterceptor> Interceptors { get; }

        Type ImplementationType { get; }
    }
}