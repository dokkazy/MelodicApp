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
        CreateMap<Brand, BrandDto>();
        CreateMap<BrandDto, Brand>().ReverseMap();
        CreateMap<Brand, BrandDetailsDto>().ReverseMap();
        CreateMap<CreateBrandCommand, Brand>();
        CreateMap<UpdateBrandCommand, Brand>();
    }
}