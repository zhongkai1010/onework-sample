using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netcore_design_patterns.FactoryPattern
{
    public class ShapeFactory
    {
        public Shape getShape(string shapeType)
        {
            return shapeType switch
            {
                null => null,
                "CIRCLE" => new Circle(),
                "RECTANGLE" => new Rectangle(),
                "SQUARE" => new Square(),
                _ => null
            };
        }
    }
}
