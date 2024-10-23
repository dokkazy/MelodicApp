using Application.Contracts.Persistence;
using Application.Exception;
using Domain.Entities;
using MediatR;

namespace Application.Feature.Speakers.Commands.DeleteSpeaker
{
    public class DeleteSpeakerCommandHandler : IRequestHandler<DeleteSpeakerCommand, Unit>
    {
        private readonly ISpeakerRepository _speakerRepository;

        public DeleteSpeakerCommandHandler(ISpeakerRepository speakerRepository)
        {
            _speakerRepository = speakerRepository;
        }

        public async Task<Unit> Handle(DeleteSpeakerCommand request, CancellationToken cancellationToken)
        {
            var speaker = await _speakerRepository.GetByIdAsync(request.Id);

            if (speaker == null)
                throw new NotFoundException(nameof(Speaker), request.Id);
            
            await _speakerRepository.DeleteAsync(speaker);

            return Unit.Value;
        }
    }
}
