using Application.Feature.Brand.Queries.GetAllBrands;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Queries.GetAllSpeakers
{
    public record GetAllSpeakerQuery(int? PageIndex) : IRequest<List<SpeakerDto>>
    {
    }
}
