using Application.Exception;
using Application.Feature.Brand.Queries.GetAllBrands;
using Application.Feature.Speakers.Commands.CreateSpeaker;
using Application.Feature.Speakers.Commands.DeleteSpeaker;
using Application.Feature.Speakers.Commands.UpdateSpeaker;
using Application.Feature.Speakers.Queries.GetAllSpeakers;
using Application.Feature.Speakers.Queries.GetSpeakerDetails;
using Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;

namespace Api.Controller;

[Route("api/[controller]")]
[ApiController]
public class SpeakersController : ODataController
{
    private readonly IMediator _mediator;
    private readonly MelodicDbContext _dbContext;

    public SpeakersController(IMediator mediator, MelodicDbContext dbContext)
    {
        _mediator = mediator;
        _dbContext = dbContext;
    }

    //[HttpGet]
    //public async Task<PaginatedList<SpeakerDto>> GetAllSpeakers(int pageIndex, string? speakerName = null, string? sortBy = null, string? sortDirection = "asc")
    //{
    //    var speakers = await _mediator.Send(new GetAllSpeakerQuery(pageIndex, speakerName, sortBy, sortDirection));
    //    return speakers;
    //}
    [HttpGet]
    [EnableQuery]
    public async Task<IActionResult> Get()
    {
        var queryableSpeakers = await _dbContext.Speakers.Include(s => s.Brand).AsNoTracking().ToListAsync();

        var speakerDtos = queryableSpeakers.Select(s => new SpeakerDto
        {
            Id = s.Id,
            Name = s.Name,
            CreateAt = s.CreatedAt,
            //BrandId = s.BrandId,
            //BrandName = s.Brand.Name,
            Brand = new BrandDto
            {
                BrandId = s.Brand.Id,
                Name = s.Brand.Name
            },

            Price = s.Price,
            Decription = s.Decription,
            UnitInStock = s.UnitInStock,
            Img = s.MainImg
        }).AsQueryable();


        return Ok(speakerDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetailSpeaker(Guid id)
    {
        if (id == Guid.Empty)
            return BadRequest("Id Not Null");

        var result = await _mediator.Send(new GetSpeakerDetailsQuery(id));

        if (result == null)
            return NotFound("No Speaker Found");

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSpeaker([FromBody] CreateSpeakerCommand command)
    {
        if (command == null)
            return BadRequest("Request body is missing");

        var result = await _mediator.Send(command);
        return Created("Create Speaker", command);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateSpeaker(Guid id, [FromBody] UpdateSpeakerCommand command)
    {
        await _mediator.Send(command);
        return Ok("Update Success: " + id);
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