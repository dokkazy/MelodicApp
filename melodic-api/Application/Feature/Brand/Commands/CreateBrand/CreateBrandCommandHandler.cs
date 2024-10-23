using Application.Contracts.Persistence;
using Application.Exception;
using AutoMapper;
using MediatR;

namespace Application.Feature.Brand.Commands.CreateBrand;

public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommand, Unit>
{
    private readonly IMapper _mapper;
    private readonly IBrandRepository _brandRepository;

    public CreateBrandCommandHandler(IMapper mapper, IBrandRepository brandRepository)
    {
        _mapper = mapper;
        _brandRepository = brandRepository;
    }

    public async Task<Unit> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
    {
        var validator = new CreateBrandCommandValidator();
        var validationResult = await validator.ValidateAsync(request);

        if (!validationResult.IsValid)
            throw new BadRequestException("Invalid Information", validationResult);

        var brandCreate = _mapper.Map<Domain.Entities.Brand>(request);
        await _brandRepository.AddAsync(brandCreate);

        return Unit.Value;
    }
}