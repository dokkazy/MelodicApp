using Application.Contracts.Persistence;
using Application.Exception;
using AutoMapper;
using MediatR;

namespace Application.Feature.Brand.Commands.UpdateBrand;

public class UpdateBrandCommandHandler : IRequestHandler<UpdateBrandCommand, Unit>
{
    private readonly IMapper _mapper;
    private readonly IBrandRepository _brandRepository;

    public UpdateBrandCommandHandler(IMapper mapper, IBrandRepository brandRepository)
    {
        _mapper = mapper;
        _brandRepository = brandRepository;
    }

    public async Task<Unit> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
    {
        var validator = new UpdateBrandCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
            throw new BadRequestException("Invalid Information", validationResult);

        var brand = await _brandRepository.GetByIdAsync(request.BrandId);

        if (brand is null)
            throw new NotFoundException(nameof(Brand), request.BrandId);

        _mapper.Map(request, brand);
        
        await _brandRepository.UpdateAsync(brand);

        return Unit.Value;
    }
}