using Application.Contracts.Persistence;
using AutoMapper;
using MediatR;

namespace Application.Feature.Speakers.Queries.GetAllSpeakers
{
    public class GetAllSpeakerQueryHandler : IRequestHandler<GetAllSpeakerQuery, List<SpeakerDto>>
    {
        private readonly ISpeakerRepository _speakerRepository;
        private readonly IMapper _mapper;

        public GetAllSpeakerQueryHandler(ISpeakerRepository speakerRepository, IMapper mapper)
        {
            _speakerRepository = speakerRepository;
            _mapper = mapper;
        }

        public async Task<List<SpeakerDto>> Handle(GetAllSpeakerQuery request, CancellationToken cancellationToken)
        {
            var query = await _speakerRepository.GetAllAsync();
            
            var data = _mapper.Map<List<SpeakerDto>>(query);
            
            return data;
        }
    }
}
