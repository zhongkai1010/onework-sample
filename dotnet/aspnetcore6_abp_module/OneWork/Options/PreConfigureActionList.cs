using System;
using System.Collections.Generic;

namespace OneWork.Options
{
    public class PreConfigureActionList<TOptions> : List<Action<TOptions>>
    {
        public void Configure(TOptions options)
        {
            foreach (var action in this)
            {
                action(options);
            }
        }
    }
}