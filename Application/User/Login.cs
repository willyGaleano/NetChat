using Application.Errors;
using Application.Interface;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<UserDto>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator: AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).EmailAddress().NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly DataContext _dataContext;


            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
                IJwtGenerator jwtGenerator, DataContext dataContext)

            {
                _signInManager = signInManager;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _dataContext = dataContext;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if(user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }                

                //el tercer parametro es para bloquear la cuenta del usuario si no se loguea correctamente
                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password,false);
                if (result.Succeeded)
                {
                    user.IsOnline = true;
                    await _dataContext.SaveChangesAsync();

                    return new UserDto
                    {
                        Token = _jwtGenerator.CreateToken(user),
                        UserName = user.UserName,
                        Email = user.Email,
                        Id = user.Id,
                        IsOnline = user.IsOnline,
                        Avatar = user.Avatar
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
