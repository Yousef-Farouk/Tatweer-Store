using AutoMapper;
using E_commerce.DTOS;
using E_commerce.Models;

namespace E_commerce.Services
{
    public class MapingProfile : Profile
    {

        public MapingProfile()
        {

            CreateMap<CartItem, CartItemDto>();

            CreateMap<Cart, CartDto>();

            CreateMap<Product, ProductDto>();

            CreateMap<ProductDto, Product>();

            CreateMap<CartItemDto, CartItem>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) 
                .ForMember(dest => dest.Product, opt => opt.Ignore()) 
                .ForMember(dest => dest.Cart, opt => opt.Ignore()); 



            CreateMap<CartDto, Cart>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) 
                .ForMember(dest => dest.CartItems, opt => opt.MapFrom(src => src.CartItems));
        }
    }
}
