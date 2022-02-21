using System;
using System.Collections.Generic;

namespace Microsoft.AspNetCore.Routing
{
    public class EndpointRouterOptions
    {
        public List<Action<EndpointRouteBuilderContext>> EndpointConfigureActions { get; }

        public EndpointRouterOptions()
        {
            EndpointConfigureActions = new List<Action<EndpointRouteBuilderContext>>();
        }
    }
}
