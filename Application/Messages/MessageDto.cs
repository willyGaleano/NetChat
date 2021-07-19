using Application.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enumeration;

namespace Application.Messages
{
    public class MessageDto
    {
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserDto Sender { get; set; }
        public MessageType MessageType { get; set; }
        public Guid ChannelId { get; set; }
    }
}
