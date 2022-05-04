using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace dotnet6_automapper_sample
{
    public class CustomProfile: Profile
    {
        public CustomProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
