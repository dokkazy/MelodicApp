using Application.Feature.Brand.Commands.CreateBrand;
using Application.Feature.Brand.Commands.DeleteBrand;
using Application.Feature.Brand.Commands.UpdateBrand;
using Application.Feature.Brand.Queries.GetAllBrands;
using Application.Feature.Brand.Queries.GetBrandDetails;
using Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controller
{
    [Route("api/brand")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly MelodicDbContext _dbContext;

        public BrandController(IMediator mediator, MelodicDbContext dbContext)
        {
            _mediator = mediator;
            _dbContext = dbContext;
        }

        [HttpGet("get-all/{pageIndex:int}")]
        public async Task<List<BrandDto>> GetAllBrands(int pageIndex)
        {
            var students = await _mediator.Send(new GetAllBrandQuery(pageIndex));
            return students;
        }

        [HttpGet("get-brand/{id:guid}")]
        public async Task<BrandDetailsDto> GetBrandDetails(Guid id)
        {
            var student = await _mediator.Send(new GetBrandDetailsQuery(id));
            return student;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateBrand([FromBody] CreateBrandCommand command)
        {
            var result = await _mediator.Send(command);
            return Created("GetStudent", command);
        }

        [HttpPut("update/{id:guid}")]
        public async Task<IActionResult> UpdateBrand(Guid id, [FromBody] UpdateBrandCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("delete/{id:guid}")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            var result = new DeleteBrandCommand { Id = id };
            await _mediator.Send(result);
            return NoContent();
        }
    }
}