using System.Threading.Tasks;

namespace OneWork.DynamicProxy
{
	public interface IAppInterceptor
    {
        Task InterceptAsync(IAppMethodInvocation invocation);
	}
}
