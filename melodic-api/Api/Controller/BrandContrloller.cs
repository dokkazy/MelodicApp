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
    public class BrandContrloller : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly MelodicDbContext _dbContext;

        public BrandContrloller(IMediator mediator, MelodicDbContext dbContext)
        {
            _mediator = mediator;
            _dbContext = dbContext;
        }

        // GET: api/<BrandContrloller>
        [HttpGet]
        public async Task<List<BrandDto>> GetAllBrands(int pageIndex)
        {
            var students = await _mediator.Send(new GetAllBrandQuery(pageIndex));
            return students;
        }

        // GET api/<BrandContrloller>/5
        [HttpGet("{id:guid}")]
        public async Task<BrandDetailsDto> GetBrandDetails(Guid id)
        {
            var student = await _mediator.Send(new GetBrandDetailsQuery(id));
            return student;
        }

        // POST api/<BrandContrloller>
        [HttpPost]
        public async Task<IActionResult> CreateBrand([FromBody] CreateBrandCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetBrandDetails), new { id = result }, result);
        }

        // PUT api/<BrandContrloller>/5
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateBrand(Guid id, [FromBody] UpdateBrandCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        // DELETE api/<BrandContrloller>/5
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            var result = new DeleteBrandCommand { Id = id };
            await _mediator.Send(result);
            return NoContent();
        }
    }
}
