using Application.Exception;
using AutoMapper;
using Domain.Entities;
using Infrastructure.Database;
using MediatR;


namespace Application.Feature.Speakers.Commands.CreateSpeaker
{
    public class CreateSpeakerCommandHandler : IRequestHandler<CreateSpeakerCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly MelodicDbContext _dbContext;

        public CreateSpeakerCommandHandler(IMapper mapper, MelodicDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(CreateSpeakerCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateSpeakerCommandValidator();

            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
                throw new BadRequestException("Invalid Information", validationResult);

            var speakerCreate = _mapper.Map<Speaker>(request);

            await _dbContext.AddAsync(speakerCreate);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
