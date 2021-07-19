using Application.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enumeration;

namespace Application.Channels
{
    public class ChannelDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<MessageDto> Messages { get; set; }
        public string PrivateChannelId { get; set; }
        public ChannelType ChannelType { get; set; }
    }
}
