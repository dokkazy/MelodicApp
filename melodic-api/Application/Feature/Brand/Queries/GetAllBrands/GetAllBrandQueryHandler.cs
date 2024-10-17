using Application.ExtensionMethods;
using Infrastructure.Database;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Brand.Queries.GetAllBrands;

public class GetAllBrandQueryHandler : IRequestHandler<GetAllBrandQuery, List<BrandDto>>
{
    private readonly IMapper _mapper;
    private readonly MelodicDbContext _dbContext;

    public GetAllBrandQueryHandler(IMapper mapper, MelodicDbContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<List<BrandDto>> Handle(GetAllBrandQuery request, CancellationToken cancellationToken)
    {
        var query = _dbContext.Brands
            .AsNoTracking()
            .AsQueryable()
            .Where(x => x.DelFlg == 0)
            .OrderBy(x => x.CreatedAt);

        var pageIndex = request.PageIndex == 0 ? 1 : request.PageIndex ?? 1;
        var pagination = await query.PaginatedListAsync(pageIndex, 5);

        var data = _mapper.Map<List<BrandDto>>(pagination.Items);
        return data;
    }
}