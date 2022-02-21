using System;
using System.Collections.Generic;

namespace OneWork.DependencyInjection
{
    public class ServiceRegistrationActionList : List<Action<IOnServiceRegistredContext>>
    {
        
    }
}