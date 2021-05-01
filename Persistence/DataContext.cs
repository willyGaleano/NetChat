using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class DataContext : DbContext
    {

        //enviamos options al constructor base
        public DataContext(DbContextOptions options) : base(options)
        {  
        }

        public DbSet<Channel> Channels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Channel>()
                .HasData(new Channel
                {
                    Id = Guid.NewGuid(),
                    Name = "DotNetCore",
                    Description = "Canal dedicado a dotnet core"
                }, new Channel
                {
                    Id = Guid.NewGuid(),
                    Name = "React JS",
                    Description = "Canal dedicado a dotnet react js"
                },
                new Channel
                {
                    Id = Guid.NewGuid(),
                    Name = "Angular",
                    Description = "Canal dedicado a dotnet angular"
                });


            base.OnModelCreating(modelBuilder);
        }
    }
}
