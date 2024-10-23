using Application.Contracts.Persistence;
using Application.Exception;
using AutoMapper;
using Domain.Entities;
using MediatR;


namespace Application.Feature.Speakers.Commands.CreateSpeaker
{
    public class CreateSpeakerCommandHandler : IRequestHandler<CreateSpeakerCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly ISpeakerRepository _speakerRepository;

        public CreateSpeakerCommandHandler(IMapper mapper, ISpeakerRepository speakerRepository)
        {
            _mapper = mapper;
            _speakerRepository = speakerRepository;
        }

        public async Task<Unit> Handle(CreateSpeakerCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateSpeakerCommandValidator();

            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
                throw new BadRequestException("Invalid Information", validationResult);

            var speakerCreate = _mapper.Map<Speaker>(request);

            await _speakerRepository.AddAsync(speakerCreate);

            return Unit.Value;
        }
    }
}
