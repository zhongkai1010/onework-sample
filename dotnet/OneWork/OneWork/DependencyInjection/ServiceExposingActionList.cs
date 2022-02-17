using System;
using System.Collections.Generic;

namespace OneWork.DependencyInjection
{
    public class ServiceExposingActionList : List<Action<IOnServiceExposingContext>>
    {

    }
}