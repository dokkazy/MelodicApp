using Application.Exception;
using Application.Feature.Speakers.Commands.CreateSpeaker;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Speakers.Commands.UpdateSpeaker
{
    public class UpdateSpeakerCommandHandler : IRequestHandler<UpdateSpeakerCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly MelodicDbContext _dbContext;

        public UpdateSpeakerCommandHandler(IMapper mapper, MelodicDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateSpeakerCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateSpeakerCommandValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
                throw new BadRequestException("Invalid Information", validationResult);

            var speaker = await _dbContext.Speakers.AsNoTracking()             
                .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

            if (speaker is null)
                throw new NotFoundException(nameof(Speaker), request.Id);

            //_mapper.Map(request, speaker);
            // Only update fields that are provided
            if (request.Name != null) speaker.Name = request.Name;
            if (request.BrandId != Guid.Empty) speaker.BrandId = request.BrandId;
            if (request.Price > 0) speaker.Price = request.Price; // Check for a valid price
            if (request.Decription != null) speaker.Decription = request.Decription;
            if (request.UnitInStock.HasValue) speaker.UnitInStock = request.UnitInStock;
            if (request.Img != null) speaker.Img = request.Img;
            _dbContext.Entry(speaker).State = EntityState.Modified;
            //_dbContext.Speakers.Update(speaker);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
