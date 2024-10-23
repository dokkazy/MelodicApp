using Application.Contracts.Persistence;
using Application.Exception;
using AutoMapper;
using MediatR;

namespace Application.Feature.Brand.Queries.GetBrandDetails;

public class GetBrandDetailsQueryHandler : IRequestHandler<GetBrandDetailsQuery, BrandDetailsDto>
{
    private readonly IMapper _mapper;
    private readonly IBrandRepository _brandRepository;

    public GetBrandDetailsQueryHandler(IMapper mapper, IBrandRepository brandRepository)
    {
        _mapper = mapper;
        _brandRepository = brandRepository;
    }

    public async Task<BrandDetailsDto> Handle(GetBrandDetailsQuery request, CancellationToken cancellationToken)
    {
        var brand = await _brandRepository.GetByIdAsync(request.Id);
        
        if (brand is null)
            throw new NotFoundException(nameof(Brand), request.Id);
        
        var data = _mapper.Map<BrandDetailsDto>(brand);
        return data;
    }
}