﻿using Application.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUserName()
        {
            var userName = _httpContextAccessor
                            .HttpContext
                            .User?
                            .Claims?
                            .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?
                            .Value;
            return userName;
        }
    }
}
