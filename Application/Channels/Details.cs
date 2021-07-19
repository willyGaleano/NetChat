using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Channels
{
    public class Details
    {
        public class Query: IRequest<ChannelDto>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ChannelDto>
        {
            private DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
                _mapper = mapper;
            }
            public async Task<ChannelDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var channel = await _context.Channels
                                        .Include(x => x.Messages)
                                        .ThenInclude(x => x.Sender)
                                        .FirstOrDefaultAsync(o => o.Id == request.id);
                if(channel == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Not Found" });
                }

                var channelReturn = _mapper.Map<Channel, ChannelDto>(channel);

                return channelReturn;
            }
        }
    }
}
