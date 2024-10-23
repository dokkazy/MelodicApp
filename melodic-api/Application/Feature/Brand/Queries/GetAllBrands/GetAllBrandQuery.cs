using MediatR;

namespace Application.Feature.Brand.Queries.GetAllBrands;

public record GetAllBrandQuery() : IRequest<List<BrandDto>>{}