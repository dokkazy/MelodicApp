using Application.Contracts.Pagination;
using MediatR;

namespace Application.Feature.Brand.Queries.GetAllBrands;

public record GetAllBrandQuery : IRequest<PaginatedList<BrandDto>>
{
    
}