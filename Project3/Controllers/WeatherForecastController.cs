using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Globalization;

namespace Project3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;


        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
             var x =Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Id = index,
                Date1 = DateTime.Now.AddDays(index).Date.ToString().Substring(0,10),
                Date2 = DateTime.Now.AddDays(2*index).Date.ToString().Substring(0, 10),
            })
            .ToList();
            return x.ToArray();
        }
        [HttpPost] 
        public List<DictinaryPair> Post([FromBody] PostData[] post) 
        {
            List<DictinaryPair> daysBetween = new List<DictinaryPair>();
            Dictionary<int, int> daysBetweenForGisto = new Dictionary<int, int>();

            foreach (var item in post)
            {
                var d1 = DateTime.ParseExact(item.date1, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                var d2 = DateTime.ParseExact(item.date2, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                var between = d2 - d1;
                if (daysBetweenForGisto.ContainsKey(between.Days))
                {
                    daysBetweenForGisto[between.Days]++;
                }
                else
                {
                    daysBetweenForGisto.Add(between.Days, 1);
                }
            }
            
            foreach (var item in daysBetweenForGisto)
            {
                daysBetween.Add(new DictinaryPair() { id = item.Key, value = item.Value });
            }
            daysBetween = daysBetween.OrderBy(x => x.id).ToList<DictinaryPair>();
            return daysBetween;
        }

        public class DictinaryPair
        {
            public int id { get; set; }
            public int value { get; set; }
        }

        public class PostData 
        {
            public string date1{ get; set; }
            public string date2{ get; set; }
        }
    }
}
