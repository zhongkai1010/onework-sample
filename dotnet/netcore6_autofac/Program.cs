// See https://aka.ms/new-console-template for more information

using Autofac;
using Autofac.Extensions.DependencyInjection;
using Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tests;

ServiceCollection serviceCollection = new ServiceCollection();

//serviceCollection.AddTransient()

//serviceCollection.AddScoped<ILogger, ConsoleLogger>();

var builder = new ContainerBuilder();

builder.Populate(serviceCollection);

//containerBuilder.RegisterType<ConsoleLogger>().As<ILogger>();

//builder.RegisterGeneric(typeof(IRepository<>)).AsSelf().AsImplementedInterfaces();

//builder.RegisterType<TransientSample>().As<ISample>().SingleInstance();

//builder.RegisterType<SingletonSample>().As<ISample>();

//builder.RegisterAssemblyTypes(typeof(Program).Assembly)
//    .Where(t => ReflectionHelper.IsAssignableToGenericType(t, typeof(IRepository<>)));

// builder.RegisterType<IUserRepository>();

builder.RegisterType<UserRepository>().As<IUserRepository>();

var container = builder.Build();

var serviceProvider = new AutofacServiceProvider(container);

//TransientSample transientSample = serviceProvider.GetRequiredService<TransientSample>();

//transientSample.Output();

//SingletonSample singletonSample = serviceProvider.GetRequiredService<SingletonSample>();

//IUserRepository userRepository = serviceProvider.GetRequiredService<IUserRepository>();


//userRepository.Insert(new User());

//Console.WriteLine(ReflectionHelper.IsAssignableToGenericType(typeof(UserRepository), typeof(IUserRepository)));


//foreach (var type in typeof(UserRepository).GetCustomAttributes(true))
//{
//    Console.WriteLine(type.ToString());
//}

Console.WriteLine(typeof(TestBaseConfig).IsGenericType);


public class TestBaseConfig : BaseConfig<TestBaseConfig>
{
    public override string FileName => "123";
}

