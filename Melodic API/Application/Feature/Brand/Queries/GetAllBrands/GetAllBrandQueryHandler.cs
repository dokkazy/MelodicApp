using Application.Contracts.Pagination;
using Infrastructure.Database;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Brand.Queries.GetAllBrands;

public class GetAllBrandQueryHandler : IRequestHandler<GetAllBrandQuery, PaginatedList<BrandDto>>
{
    private readonly IMapper _mapper;
    private readonly MelodicDbContext _dbContext;

    public GetAllBrandQueryHandler(IMapper mapper, MelodicDbContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<PaginatedList<BrandDto>> Handle(GetAllBrandQuery request, CancellationToken cancellationToken)
    {
        var brands = await _dbContext.Brands.AsNoTracking().ToListAsync();
        var data = _mapper.Map<PaginatedList<BrandDto>>(brands);
        return data;
    }
}