using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var channels = new string[] { ".Netc core", "Recta JS", "Angular" };
            return Ok(channels);
        }
    }
}
