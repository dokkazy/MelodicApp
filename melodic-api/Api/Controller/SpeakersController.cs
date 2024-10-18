using Application.Feature.Brand.Queries.GetAllBrands;
using Application.Feature.Speakers.Queries.GetAllSpeakers;
using Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Http;
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


        [HttpGet]
        public async Task<PaginatedList<SpeakerDto>> GetAllBrands(int pageIndex)
        {
            var speakers = await _mediator.Send(new GetAllSpeakerQuery(pageIndex));
            return speakers;
        }

    }
}
