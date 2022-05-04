using System.Threading.Tasks;

namespace OneWork.DynamicProxy
{
	public abstract class AppInterceptor : IAppInterceptor
    {
        public abstract Task InterceptAsync(IAppMethodInvocation invocation);
    }
}