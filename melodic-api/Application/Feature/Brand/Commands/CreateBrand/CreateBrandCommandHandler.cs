using Application.Exception;
using AutoMapper;
using Infrastructure.Database;
using MediatR;

namespace Application.Feature.Brand.Commands.CreateBrand;

public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommand, Unit>
{
    private readonly IMapper _mapper;
    private readonly MelodicDbContext _dbContext;

    public CreateBrandCommandHandler(IMapper mapper, MelodicDbContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
    {
        var validator = new CreateBrandCommandValidator();
        var validationResult = await validator.ValidateAsync(request);

        if (!validationResult.IsValid)
            throw new BadRequestException("Invalid Information", validationResult);

        var brandCreate = _mapper.Map<Domain.Entities.Brand>(request);
        await _dbContext.AddAsync(brandCreate);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }
}