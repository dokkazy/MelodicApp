using Application.Contracts.Persistence;
using Application.Exception;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Feature.Speakers.Queries.GetSpeakerDetails
{
    public class GetSpeakerDetailsHandler : IRequestHandler<GetSpeakerDetailsQuery, SpeakerDetailsDto>
    {
        private readonly IMapper _mapper;
        private readonly ISpeakerRepository _speakerRepository;

        public GetSpeakerDetailsHandler(IMapper mapper, ISpeakerRepository speakerRepository)
        {
            _mapper = mapper;
            _speakerRepository = speakerRepository;
        }

        public async Task<SpeakerDetailsDto> Handle(GetSpeakerDetailsQuery request, CancellationToken cancellationToken)
        {
            var speaker = await _speakerRepository.GetSpeakerDetails(request.Id);

            var data = _mapper.Map<SpeakerDetailsDto>(speaker);
            
            return data;

        }
    }
}
