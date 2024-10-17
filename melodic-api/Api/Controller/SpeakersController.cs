using Application.Exception;
using Application.Feature.Brand.Commands.DeleteBrand;
using Application.Feature.Brand.Queries.GetAllBrands;
using Application.Feature.Speakers.Commands.CreateSpeaker;
using Application.Feature.Speakers.Commands.DeleteSpeaker;
using Application.Feature.Speakers.Queries.GetAllSpeakers;
using Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpeakersController : ControllerBase
    {

        private readonly IMediator _mediator;
        private readonly MelodicDbContext _dbContext;

        public SpeakersController(IMediator mediator, MelodicDbContext dbContext)
        {
            _mediator = mediator;
            _dbContext = dbContext;
        }


        [HttpGet()]
        public async Task<List<SpeakerDto>> GetAllBrands(int pageIndex)
        {
            var speakers = await _mediator.Send(new GetAllSpeakerQuery(pageIndex));
            return speakers;
        }


        [HttpPost]
        public async Task<IActionResult> CreateSpeaker([FromBody] CreateSpeakerCommand command)
        {
             if (command == null)
                return BadRequest("Request body is missing");

            var result = await _mediator.Send(command);
            return Created("Create Speaker", command);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpeaker(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest("Invalid ID");

            try
            {
                var result = await _mediator.Send(new DeleteSpeakerCommand { Id = id });
                return NoContent();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
