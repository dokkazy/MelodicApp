using MediatR;

namespace Application.Feature.Brand.Queries.GetBrandDetails;

public record GetBrandDetailsQuery(Guid Id) : IRequest<BrandDetailsDto>
{
    
}