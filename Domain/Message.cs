using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using static Domain.Enumeration;

namespace Domain
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Content  { get; set; }
        public DateTime CreatedAt { get; set; }
        public AppUser Sender { get; set; }
        public string SenderId { get; set; }
        //para ignorar el problema de ciclo de consulta
        [JsonIgnore]
        public Channel Channel { get; set; }
        public Guid ChannelId { get; set; }
        public MessageType MessageType { get; set; }
}
}
