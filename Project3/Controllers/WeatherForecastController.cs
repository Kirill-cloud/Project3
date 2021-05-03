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
    public class UsersController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<User> Get()
        {
            var rng = new Random();
            var x = Enumerable.Range(1, 5).Select(index => new User
            {
                Id = index,
                Date1 = String.Format("{0:dd.MM.yyyy}", DateTime.Now.AddDays(index)),
                Date2 = String.Format("{0:dd.MM.yyyy}", DateTime.Now.AddDays(2 * index)),
            })
            .ToList();
            return x.ToArray();
        }
        [HttpPut]
        public ActionResult Save([FromBody] User[] usersToSave)
        {
            return Ok();
        }

        [HttpPost]
        public PostResponce Calculate([FromBody] PostData[] post)
        {
            List<int> daysBetween = new List<int>();

            foreach (var item in post)
            {
                var d1 = DateTime.ParseExact(item.date1, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                var d2 = DateTime.ParseExact(item.date2, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                var between = d2 - d1;

                daysBetween.Add(between.Days);
            }
            DateTime sevenDay = DateTime.Now.AddDays(-7);

            IEnumerable<PostData> oldUsers = post.Where<PostData>(x => DateTime.ParseExact(x.date1, "dd.MM.yyyy", CultureInfo.InvariantCulture) <= sevenDay);

            double firstParam = oldUsers.Count<PostData>(x => DateTime.ParseExact(x.date2, "dd.MM.yyyy", CultureInfo.InvariantCulture) >= sevenDay);

            double secondParam = oldUsers.Count();


            return new PostResponce() { UsersLifeTime = daysBetween, RR7days = String.Format("{0:P}", firstParam / secondParam) };
        }

        public class PostResponce
        {
            public List<int> UsersLifeTime { get; set; }
            public string RR7days { get; set; }
        }

        public class PostData
        {
            public string date1 { get; set; }
            public string date2 { get; set; }
        }
    }
}
