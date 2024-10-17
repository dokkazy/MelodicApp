using Application.Exception;
using Application.Feature.Brand.Commands.CreateBrand;
using AutoMapper;
using Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Brand.Commands.UpdateBrand;

public class UpdateBrandCommandHandler : IRequestHandler<UpdateBrandCommand, Unit>
{
    private readonly IMapper _mapper;
    private readonly MelodicDbContext _dbContext;

    public UpdateBrandCommandHandler(IMapper mapper, MelodicDbContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
    {
        var validator = new UpdateBrandCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
            throw new BadRequestException("Invalid Information", validationResult);

        var brand = await _dbContext.Brands
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.BrandId == request.BrandId, cancellationToken);

        if (brand is null)
            throw new NotFoundException(nameof(Brand), request.BrandId);

        _mapper.Map(request, brand);

        _dbContext.Brands.Update(brand);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}