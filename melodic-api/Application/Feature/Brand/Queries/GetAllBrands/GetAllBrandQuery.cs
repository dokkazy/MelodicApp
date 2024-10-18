using MediatR;

namespace Application.Feature.Brand.Queries.GetAllBrands;

public record GetAllBrandQuery(int? PageIndex) : IRequest<PaginatedList<BrandDto>>{}