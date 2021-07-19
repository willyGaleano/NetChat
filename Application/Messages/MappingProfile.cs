using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Messages
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
    {
        CreateMap<Message, MessageDto>();
        CreateMap<Channel, MessageDto>()
                .ForMember(d => d.ChannelId, o => o.MapFrom(s => s.Id));
        }
}
}
