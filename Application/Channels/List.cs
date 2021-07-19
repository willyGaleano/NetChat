using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static Domain.Enumeration;

namespace Application.Channels
{
    public class List
    {
        public class Query : IRequest<List<Channel>>
        {
            public ChannelType ChannelType { get; set; } = ChannelType.Channel;
        }

        public class Handler : IRequestHandler<Query, List<Channel>>
        {
            private DataContext _context;
            //private ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context ?? throw new ArgumentNullException(nameof(context));
               // _logger = logger;
            }

            public async Task<List<Channel>> Handle(Query request, CancellationToken cancellationToken)
            {
                //try
                //{
                //    for(int i = 0; i< 10; i++)
                //    {
                //        cancellationToken.ThrowIfCancellationRequested();
                //        await Task.Delay(1000, cancellationToken);
                //        _logger.LogInformation($"Tarea {i} completada");
                //    }
                //}
                //catch(Exception ex) when (ex is TaskCanceledException)
                //{
                //    _logger.LogInformation("La tarea fue cancelada");
                //}
                //throw new RestException(System.Net.HttpStatusCode.NotFound, new { channels = "No hay ni mierda"});
                //throw new Exception("SERVER ERROR");
                return await _context.Channels.Where(x => x.ChannelType == request.ChannelType).ToListAsync();
            }
        }
    }
}
