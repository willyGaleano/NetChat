using Application.Errors;
using Application.Interface;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static Domain.Enumeration;

namespace Application.Messages
{
    public class Create
    {
        public class Command : IRequest<MessageDto>
        {
            public Guid ChannelId { get; set; }
            public string Content { get; set; }
            public MessageType MessageType { get; set; } = MessageType.Text;
            public IFormFile file { get; set; }

        }

        public class Handler : IRequestHandler<Command, MessageDto>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly IMediaUpload _mediaUpload;

            public Handler(DataContext dataContext, IUserAccessor userAccesor, IMediaUpload mediaUpload, IMapper mapper)
            {
                _dataContext = dataContext;
                _userAccessor = userAccesor;
                _mapper = mapper;
                _mediaUpload = mediaUpload;
            }

            public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _dataContext.Users
                        .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var channel = await _dataContext
                        .Channels
                        .SingleOrDefaultAsync(x => x.Id == request.ChannelId);

                if(channel == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Channel not found" }); 
                }

                var message = new Message
                {
                    Content = request.MessageType == MessageType.Text 
                                                                ? request.Content 
                                                                : _mediaUpload.UploadMedia(request.file).Url,
                    Channel = channel,
                    Sender = user,
                    CreatedAt = DateTime.Now,
                    MessageType = request.MessageType
                };

                _dataContext.Messages.Add(message);

                if(await _dataContext.SaveChangesAsync() > 0)
                {
                    return _mapper.Map<Message, MessageDto>(message);
                    //return new MessageDto
                    //{
                    //    Sender = new User.UserDto
                    //    {
                    //        UserName = user.UserName,
                    //        Avatar = user.Avatar,
                    //    },
                    //    Content = message.Content,
                    //    CreatedAt = message.CreatedAt
                    //};
                }

                throw new Exception("There was a problem inserting the message");

            }
        }
    }

    
}
