using MediatR;

namespace Application.Feature.Brand.Commands.CreateBrand;

public class CreateBrandCommand : IRequest<Unit>
{
    public string Name { get; set; } = string.Empty;
}