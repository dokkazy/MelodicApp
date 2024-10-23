using Application.Contracts.Persistence;
using AutoMapper;
using MediatR;

namespace Application.Feature.Brand.Queries.GetAllBrands;

public class GetAllBrandQueryHandler : IRequestHandler<GetAllBrandQuery, List<BrandDto>>
{
    private readonly IMapper _mapper;
    private readonly IBrandRepository _brandRepository;

    public GetAllBrandQueryHandler(IMapper mapper, IBrandRepository brandRepository)
    {
        _mapper = mapper;
        _brandRepository = brandRepository;
    }

    public async Task<List<BrandDto>> Handle(GetAllBrandQuery request, CancellationToken cancellationToken)
    {
        var query = await _brandRepository.GetAllAsync();

        // var pageIndex = request.PageIndex == 0 ? 1 : request.PageIndex ?? 1;
        // var pagination = await query.PaginatedListAsync(pageIndex, 5);

        var data = _mapper.Map<List<BrandDto>>(query);
        return data;
    }
}