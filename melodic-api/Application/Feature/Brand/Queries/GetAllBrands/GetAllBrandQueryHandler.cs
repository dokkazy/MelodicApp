using Application.ExtensionMethods;
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
        var query = _dbContext.Brands
            .AsNoTracking()
            .AsQueryable()
            .Where(x => x.DelFlg == 0)
            .OrderBy(x => x.CreatedAt);

        var pageIndex = request.PageIndex == 0 ? 1 : request.PageIndex ?? 1;
        var pagination = await query.PaginatedListAsync(pageIndex, 5);

        var data = _mapper.Map<PaginatedList<BrandDto>>(pagination);
        return data;
    }
}