using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Queries.GetSpeakerDetails
{
    public record GetSpeakerDetailsQuery(Guid Id) : IRequest<SpeakerDetailsDto>
    {

    }
}
