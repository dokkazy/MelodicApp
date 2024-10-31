using Application.Contracts.Pagination;
using Application.Feature.Brand.Commands.CreateBrand;
using Application.Feature.Brand.Commands.UpdateBrand;
using Application.Feature.Brand.Queries.GetAllBrands;
using Application.Feature.Brand.Queries.GetBrandDetails;
using AutoMapper;
using Domain.Entities;

namespace Application.MappingProfiles;

public class BrandProfile : Profile
{
    public BrandProfile()
    {
        CreateMap<BrandDto, Brand>()
            .ForMember(x => x.Id , opt => opt.MapFrom(src => src.BrandId))
            .ForMember(x => x.Name , opt => opt.MapFrom(src => src.Name))
            .ReverseMap();
        CreateMap<Brand, BrandDetailsDto>()
            .ForMember(x => x.BrandId , opt => opt.MapFrom(src => src.Id))
            .ForMember(x => x.Name , opt => opt.MapFrom(src => src.Name)).ReverseMap();
        CreateMap(typeof(PaginatedList<>), typeof(PaginatedList<>)).ConvertUsing(typeof(PaginatedListConverter<,>));
        CreateMap<CreateBrandCommand, Brand>();
        CreateMap<UpdateBrandCommand, Brand>();
    }
}