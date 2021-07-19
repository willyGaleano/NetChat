using API.SignalR;
using Application.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class MessageController : BaseController
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public MessageController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("upload")]
        public async Task<ActionResult<MessageDto>> MediaUpload([FromForm] Create.Command command)
        {
            var result = await Mediator.Send(command);

            await _hubContext.Clients.All.SendAsync("ReciveMessage", result);
            return result;
        }
    }
}
