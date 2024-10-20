using MediatR;

namespace Application.Feature.Speakers.Queries.GetAllSpeakers
{
    public record GetAllSpeakerQuery(int? PageIndex,  string?speakerName, string? sortBy, string? sortDirection) : IRequest<PaginatedList<SpeakerDto>>
    {
    }
}
