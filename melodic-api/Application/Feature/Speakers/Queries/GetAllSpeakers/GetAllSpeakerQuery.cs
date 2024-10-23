using MediatR;

namespace Application.Feature.Speakers.Queries.GetAllSpeakers
{
    public record GetAllSpeakerQuery() : IRequest<List<SpeakerDto>>
    {
    }
}
