﻿using Application.Interface;
using Application.MediaUpload;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.MediaUpload
{
    public class MediaUpload : IMediaUpload
    {
        private readonly Cloudinary _cloudinary;

        //para acceder a los objetos que se encargan solamente de almacenar 
        //informacion de configuracion
        public MediaUpload(IOptions<CloudinarySettings> config)
        {
            var acc = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(acc);
        }

        public MediaUploadResult UploadMedia(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            
            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),

                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            if(uploadResult.Error != null)
            {
                throw new System.Exception(uploadResult.Error.Message);
            }

            return new MediaUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };

        }
    }
}
