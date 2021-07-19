using Application.MediaUpload;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interface
{
    public interface IMediaUpload
    {
        MediaUploadResult UploadMedia(IFormFile file);        
    }
}
