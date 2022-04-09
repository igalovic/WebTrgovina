using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class ProductsUrlResolver : IValueResolver<Product, ProductToReturnDto, string>   //vracanje slike u obliku api url-a
    {
        private readonly IConfiguration _config;
        public ProductsUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
           if(!string.IsNullOrEmpty(source.PictureUrl))
           {
               return _config["ApiUrl"] + source.PictureUrl;
           }

           return null;
        }
    }
}