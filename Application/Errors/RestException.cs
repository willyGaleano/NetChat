using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public HttpStatusCode _code;
        public object _errors;

        public RestException(HttpStatusCode code, object errors = null)
        {
            _code = code;
            _errors = errors;
        }
    }
}
