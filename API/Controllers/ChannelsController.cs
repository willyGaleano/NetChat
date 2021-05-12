using Application.Channels;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    
    public class ChannelsController : BaseController
    {
        

        //Para tareas que demoran demasiado
        //[HttpGet]
        //public async Task<ActionResult<List<Channel>>> GetAllAsync(CancellationToken ct)
        //{
        //    var channels = await _mediator.Send(new List.Query(), ct);
        //    return Ok(channels);
        //}
        [HttpGet]
        public async Task<ActionResult<List<Channel>>> GetAllAsync()
        {
            var channels = await Mediator.Send(new List.Query());
            return Ok(channels);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Channel>> Get(Guid id)
        {
            var channel = await Mediator.Send(new Details.Query { id = id});
            return Ok(channel);
        }

        [HttpPost]
        public async Task<Unit> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}
