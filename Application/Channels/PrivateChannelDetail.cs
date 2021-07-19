using Application.Interface;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
    public class PrivateChannelDetail
    {
        public class Query : IRequest<ChannelDto>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ChannelDto>
        {
            private readonly DataContext _dataContext; 
            private readonly IUserAccessor _userAccesor;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccesor)
            {
                _dataContext = dataContext;
                _userAccesor = userAccesor;
                _mapper = mapper;
            }

            public async  Task<ChannelDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await _dataContext.Users
                                    .SingleOrDefaultAsync(x => x.UserName == _userAccesor.GetCurrentUserName());

                var user = await _dataContext.Users.FindAsync(request.UserId);

                var privateChannelIdForCurrentUser = GetPrivateChannelId(currentUser.Id.ToString(), request.UserId);
                var privateChannelIdForRecipientUser = GetPrivateChannelId(request.UserId, currentUser.Id.ToString());

                var channel = await _dataContext.Channels
                                    .Include(x => x.Messages).ThenInclude(x => x.Sender)
                                    .SingleOrDefaultAsync(x => x.PrivateChannelId == privateChannelIdForCurrentUser
                                           || x.PrivateChannelId == privateChannelIdForRecipientUser);

                if(channel == null)
                {
                    var newChannel = new Channel
                    {
                        Id = Guid.NewGuid(),
                        Name = currentUser.UserName,
                        Description = user.UserName,
                        ChannelType = ChannelType.Room,
                        PrivateChannelId = privateChannelIdForCurrentUser
                    };

                    _dataContext.Channels.Add(newChannel);
                    var success = await _dataContext.SaveChangesAsync() > 0;
                    if (success)
                    {
                        return _mapper.Map<Channel, ChannelDto>(newChannel);
                    }
                }

                return _mapper.Map<Channel, ChannelDto >(channel);

            }

            private static string GetPrivateChannelId(string currentUserId, string userId) => $"{currentUserId}/{userId}";
        }
    }
}
