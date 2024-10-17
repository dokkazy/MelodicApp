using MediatR;

namespace Application.Feature.Brand.Commands.UpdateBrand;

public class UpdateBrandCommand : IRequest<Unit>
{
    public Guid BrandId { get; set; }
    public string Name { get; set; } = string.Empty;
}