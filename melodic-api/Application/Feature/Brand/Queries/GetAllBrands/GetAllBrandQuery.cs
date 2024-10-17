using MediatR;

namespace Application.Feature.Brand.Queries.GetAllBrands;

public record GetAllBrandQuery(int pageIndex) : IRequest<List<BrandDto>>{}