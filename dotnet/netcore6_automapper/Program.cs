using AutoMapper;
using dotnet6_automapper_sample;

User user = new User
{
    UserName = "zhongkai1010",
    Password = "123456"
};
MapperConfiguration mapperConfiguration = new MapperConfiguration(expression =>
{
    // 通过assembly名进行扫描加载AutoMap标签属性或者Profile实现类
    //expression.AddMaps("dotnet6_automapper_sample");
    expression.CreateMap<UserDto, User>().ReverseMap();


});
IMapper mapper = mapperConfiguration.CreateMapper();

UserDto userDto = mapper.Map<UserDto>(user);



Console.WriteLine(userDto.UserName);