using Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "1",
                        UserName = "Williams",
                        Email = "willyrhcp96@gmail.com"
                    },
                    new AppUser
                    {
                        Id = "2",
                        UserName = "Sofia",
                        Email = "sofiarhcp96@gmail.com"
                    },
                    new AppUser
                    {
                        Id = "3",
                        UserName = "Luna",
                        Email = "lunitarhcp96@gmail.com"
                    }
                };

                foreach(var user in users)
                {
                    await userManager.CreateAsync(user,"Pa$$w0ord");
                }

            }
        }
    }
}
