using Application.Errors;
using Application.Interface;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Register
    {
        public class Command: IRequest<UserDto>
        {
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Avatar { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator(UserManager<AppUser> _userManager)
            {
                RuleFor(x => x.UserName)
                            .NotEmpty()
                            .MustAsync(async (userName, cancellation) => (await _userManager.FindByNameAsync(userName)) == null)
                            .WithMessage("Username already exists");

                RuleFor(x => x.Email)
                            .NotEmpty()
                            .EmailAddress()
                            .MustAsync(async (email, cancellation) => (await _userManager.FindByEmailAsync(email)) == null)
                            .WithMessage("Email already exists");
                RuleFor(x => x.Password).Password();
                   
            }
        }

        public class Handler : IRequestHandler<Command, UserDto>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator) 
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //if(await _userManager.FindByEmailAsync(request.Email) != null)
                //{
                //    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });
                //}
                //if (await _userManager.FindByNameAsync(request.UserName) != null)
                //{
                //    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "UserName already exists" });
                //}

                var user = new AppUser
                {
                    Email = request.Email,
                    UserName = request.UserName,
                    Avatar = request.Avatar
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new UserDto
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        Token = _jwtGenerator.CreateToken(user)
                    };
                }

                throw new Exception($"Error: {result.Errors}");
            }
        }
    }
}
