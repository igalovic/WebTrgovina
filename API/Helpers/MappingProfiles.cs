using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product,ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name)) // automapper ne zna sto vratiti string ili klasu i vraca string. Ovime mu omogucavamo da iz klase vrati string
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.PictureUrl , o => o.MapFrom<ProductsUrlResolver>());
            CreateMap<Address,AddressDto>().ReverseMap();
        }
    }
}