using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.StrategyPattern
{
    public interface Strategy
    {
        public int doOperation(int num1, int num2);
    }

    public class OperationAdd:Strategy
    {
        public int doOperation(int num1, int num2)
        {
            return num1 + num2;
        }
    }

    public class OperationSubtract:Strategy
    {
        public int doOperation(int num1, int num2)
        {
            return num1 - num2;
        }
    }

    public class OperationMultiply:Strategy
    {
        public int doOperation(int num1, int num2)
        {
            return num1 * num2;
        }
    }

    public class Context
    {
        private readonly Strategy strategy;

        public Context(Strategy strategy)
        {
            this.strategy = strategy;
        }

        public int executeStrategy(int num1, int num2)
        {
            return strategy.doOperation(num1, num2);
        }
    }


}
