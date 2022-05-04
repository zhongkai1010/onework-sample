// See https://aka.ms/new-console-template for more information

#region Adapter Pattern

//AudioPlayer audioPlayer = new AudioPlayer();

//audioPlayer.play("mp3", "beyond the horizon.mp3");
//audioPlayer.play("mp4", "alone.mp4");
//audioPlayer.play("vlc", "far far away.vlc");
//audioPlayer.play("avi", "mind me.avi");

#endregion

#region Bridge Pattern

//using netcore_design_patterns.BridgePattern;

//Shape redCircle = new Circle(100, 100, 10, new RedCircle());

//Shape greenCircle = new Circle(100, 100, 10, new GreenCircle());

//redCircle.draw();

//greenCircle.draw();

#endregion

#region Observer Pattern

//using netcore_design_patterns.ObserverPattern;

//Subject subject = new Subject();

//new HexaObserver(subject);
//new OctalObserver(subject);
//new BinaryObserver(subject);
//Console.WriteLine("First state change: 15");
//subject.setState(15);
//Console.WriteLine("Second state change: 10");
//subject.setState(10);

#endregion

#region Template Pattern

//using netcore_design_patterns.TemplatePattern;

//Game game = new Cricket();
//game.Play();

//Console.WriteLine();

//game = new Football();
//game.Play();

#endregion

#region Composite Pattern

//using netcore_design_patterns.CompositePattern;

//Employee CEO = new Employee("John", "CEO", 30000);

//Employee headSales = new Employee("Robert", "Head Sales", 20000);

//Employee headMarketing = new Employee("Michel", "Head Marketing", 20000);

//Employee clerk1 = new Employee("Laura", "Marketing", 10000);
//Employee clerk2 = new Employee("Bob", "Marketing", 10000);

//Employee salesExecutive1 = new Employee("Richard", "Sales", 10000);
//Employee salesExecutive2 = new Employee("Rob", "Sales", 10000);

//CEO.add(headSales);
//CEO.add(headMarketing);

//headSales.add(salesExecutive1);
//headSales.add(salesExecutive2);

//headMarketing.add(clerk1);
//headMarketing.add(clerk2);

////打印该组织的所有员工
//Console.WriteLine(CEO);
//foreach (Employee headEmployee in CEO.getSubordinates())
//{
//    Console.WriteLine(headEmployee);

//    foreach (Employee employee in headEmployee.getSubordinates())
//    {
//        Console.WriteLine(employee);
//    }
//}

#endregion

#region Builder Pattern

//using netcore_design_patterns.BuilderPattern;

//MealBuilder mealBuilder = new MealBuilder();

//Meal vegMeal = mealBuilder.prepareVegMeal();

//Console.WriteLine("Veg Meal");
//vegMeal.showItems();
//Console.WriteLine("Total Cost: " + vegMeal.getCost());

//Meal nonVegMeal = mealBuilder.prepareNonVegMeal();
//Console.WriteLine("\n\nNon-Veg Meal");
//nonVegMeal.showItems();
//Console.WriteLine("Total Cost: " + nonVegMeal.getCost());

#endregion

#region Decorator Pattern

//using netcore_design_patterns.DecoratorPattern;

//Shape circle = new Circle();
//ShapeDecorator redCircle = new RedShapeDecorator(new Circle());
//ShapeDecorator redRectangle = new RedShapeDecorator(new Rectangle());
////Shape redCircle = new RedShapeDecorator(new Circle());
////Shape redRectangle = new RedShapeDecorator(new Rectangle());
//Console.WriteLine("Circle with normal border");
//circle.draw();

//Console.WriteLine("\nCircle of red border");
//redCircle.draw();

//Console.WriteLine("\nRectangle of red border");
//redRectangle.draw();

#endregion

#region Strategy Pattern

//using netcore_design_patterns.StrategyPattern;

//Context context = new Context(new OperationAdd());
//Console.WriteLine("10 + 5 = " + context.executeStrategy(10, 5));

//context = new Context(new OperationSubtract());
//Console.WriteLine("10 - 5 = " + context.executeStrategy(10, 5));

//context = new Context(new OperationMultiply());
//Console.WriteLine("10 * 5 = " + context.executeStrategy(10, 5));


#endregion

#region Abstract Factory Pattern

////获取形状工厂
//using netcore_design_patterns.AbstractFactoryPattern;

//AbstractFactory shapeFactory = FactoryProducer.getFactory("SHAPE");

////获取形状为 Circle 的对象
//Shape shape1 = shapeFactory.getShape("CIRCLE");

////调用 Circle 的 draw 方法
//shape1.draw();

////获取形状为 Rectangle 的对象
//Shape shape2 = shapeFactory.getShape("RECTANGLE");

////调用 Rectangle 的 draw 方法
//shape2.draw();

////获取形状为 Square 的对象
//Shape shape3 = shapeFactory.getShape("SQUARE");

////调用 Square 的 draw 方法
//shape3.draw();

////获取颜色工厂
//AbstractFactory colorFactory = FactoryProducer.getFactory("COLOR");

////获取颜色为 Red 的对象
//Color color1 = colorFactory.getColor("RED");

////调用 Red 的 fill 方法
//color1.fill();

////获取颜色为 Green 的对象
//Color color2 = colorFactory.getColor("GREEN");

////调用 Green 的 fill 方法
//color2.fill();

////获取颜色为 Blue 的对象
//Color color3 = colorFactory.getColor("BLUE");

////调用 Blue 的 fill 方法
//color3.fill();

#endregion

#region FactoryPattern

//using netcore_design_patterns.FactoryPattern;

//ShapeFactory shapeFactory = new ShapeFactory();

////获取 Circle 的对象，并调用它的 draw 方法
//Shape shape1 = shapeFactory.getShape("CIRCLE");

////调用 Circle 的 draw 方法
//shape1.draw();

////获取 Rectangle 的对象，并调用它的 draw 方法
//Shape shape2 = shapeFactory.getShape("RECTANGLE");

////调用 Rectangle 的 draw 方法
//shape2.draw();

////获取 Square 的对象，并调用它的 draw 方法
//Shape shape3 = shapeFactory.getShape("SQUARE");

////调用 Square 的 draw 方法
//shape3.draw();

#endregion

#region Singleton Pattern

//using netcore_design_patterns.Singleton_Pattern;

//SingleObject singleObject = SingleObject.getInstance();    

//singleObject.showMessage();

#endregion