using System;
using System.Collections.Generic;
using System.Text;

namespace OneWork
{
    [DependsOn(typeof(Module1))]
    public class ApplicationBootModule : AppModule
    {
    }

    [DependsOn(typeof(Module2))]
    public class Module1 : AppModule
    {
    }

    [DependsOn(typeof(Module3))]
    public class Module2 : AppModule
    {
    }

    [DependsOn(typeof(Module4))]
    public class Module3 : AppModule
    {
    }

    public class Module4 : AppModule
    {
    }
}