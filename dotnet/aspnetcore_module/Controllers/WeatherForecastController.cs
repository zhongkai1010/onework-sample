using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Tests;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private TransientFaultHandlingOptions transientFaultHandlingOptions;

        private readonly ILogger<WeatherForecastController> _logger;

        private IUserRepository _userRepository;

        public WeatherForecastController(ILogger<WeatherForecastController> logger,
            IOptions<TransientFaultHandlingOptions> options, IUserRepository userRepository)
        {
            _logger = logger;

            _userRepository = userRepository;

            transientFaultHandlingOptions = options.Value;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            _userRepository.Add();
            
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                })
                .ToArray();
        }
    }
}