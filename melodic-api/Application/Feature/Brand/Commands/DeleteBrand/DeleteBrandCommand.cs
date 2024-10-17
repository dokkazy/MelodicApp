using MediatR;

namespace Application.Feature.Brand.Commands.DeleteBrand;

public class DeleteBrandCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}