using Application.Contracts.Persistence;
using Application.Exception;
using MediatR;

namespace Application.Feature.Brand.Commands.DeleteBrand;

public class DeleteBrandCommandHandler : IRequestHandler<DeleteBrandCommand, Unit>
{
    private readonly IBrandRepository _brandRepository;

    public DeleteBrandCommandHandler(IBrandRepository brandRepository)
    {
        _brandRepository = brandRepository;
    }

    public async Task<Unit> Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = await _brandRepository.GetByIdAsync(request.Id);
        if (brand == null) throw new NotFoundException(nameof(Brand), request.Id);

        await _brandRepository.DeleteAsync(brand);
        return Unit.Value;
    }
}