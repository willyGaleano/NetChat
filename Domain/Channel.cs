﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Channel
    {
        //EF considera al Guid como llave primaria
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
