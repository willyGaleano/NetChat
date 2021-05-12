using Application.Errors;
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
        public class Query: IRequest<Channel>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Channel>
        {
            private DataContext _context;

            public Handler(DataContext context)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
            }
            public async Task<Channel> Handle(Query request, CancellationToken cancellationToken)
            {
                var channel = await _context.Channels.Where(x => x.Id == request.id).FirstOrDefaultAsync();
                if(channel == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Not Found" });
                }
                return channel;
            }
        }
    }
}
