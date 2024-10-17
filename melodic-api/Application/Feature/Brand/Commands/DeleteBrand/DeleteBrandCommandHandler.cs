using Application.Exception;
using Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Brand.Commands.DeleteBrand;

public class DeleteBrandCommandHandler : IRequestHandler<DeleteBrandCommand, Unit>
{
    private readonly MelodicDbContext _dbContext;

    public DeleteBrandCommandHandler(MelodicDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = await _dbContext.Brands.AsNoTracking().FirstOrDefaultAsync(x => x.BrandId == request.Id, cancellationToken: cancellationToken);
        if (brand != null) brand.DelFlg = 0;
        else
        {
            throw new NotFoundException(nameof(Brand), request.Id);
        }
        await _dbContext.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}