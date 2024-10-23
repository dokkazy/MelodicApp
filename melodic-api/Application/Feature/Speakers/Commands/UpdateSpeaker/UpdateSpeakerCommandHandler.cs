using Application.Contracts.Persistence;
using Application.Exception;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Speakers.Commands.UpdateSpeaker
{
    public class UpdateSpeakerCommandHandler : IRequestHandler<UpdateSpeakerCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly ISpeakerRepository _speakerRepository;

        public UpdateSpeakerCommandHandler(IMapper mapper, ISpeakerRepository speakerRepository)
        {
            _mapper = mapper;
            _speakerRepository = speakerRepository;
        }

        public async Task<Unit> Handle(UpdateSpeakerCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateSpeakerCommandValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
                throw new BadRequestException("Invalid Information", validationResult);

            var speaker = await _speakerRepository.GetByIdAsync(request.Id);

            if (speaker is null)
                throw new NotFoundException(nameof(Speaker), request.Id);

            //_mapper.Map(request, speaker);
            // Only update fields that are provided
            if (request.Name != null) speaker.Name = request.Name;
            if (request.BrandId != Guid.Empty) speaker.BrandId = request.BrandId;
            if (request.Price > 0) speaker.Price = request.Price; // Check for a valid price
            if (request.Decription != null) speaker.Decription = request.Decription;
            if (request.UnitInStock.HasValue) speaker.UnitInStock = request.UnitInStock;
            if (request.Img != null) speaker.MainImg = request.Img;

            //_speakerRepository.Speakers.Update(speaker);
            await _speakerRepository.UpdateAsync(speaker);

            return Unit.Value;
        }
    }
}
