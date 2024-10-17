using AutoMapper;
using Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Brand.Queries.GetBrandDetails;

public class GetBrandDetailsQueryHandler : IRequestHandler<GetBrandDetailsQuery, BrandDetailsDto>
{
    private readonly IMapper _mapper;
    private readonly MelodicDbContext _dbContext;

    public GetBrandDetailsQueryHandler(IMapper mapper, MelodicDbContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<BrandDetailsDto> Handle(GetBrandDetailsQuery request, CancellationToken cancellationToken)
    {
        var brand = await _dbContext.Brands.AsNoTracking().FirstOrDefaultAsync(x => x.BrandId == request.Id);
        var data = _mapper.Map<BrandDetailsDto>(brand);
        return data;
    }
}