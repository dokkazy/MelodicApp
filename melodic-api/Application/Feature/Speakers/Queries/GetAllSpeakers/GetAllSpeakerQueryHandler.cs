using Application.ExtensionMethods;
using AutoMapper;
using Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Queries.GetAllSpeakers
{
    public class GetAllSpeakerQueryHandler : IRequestHandler<GetAllSpeakerQuery, List<SpeakerDto>>
    {
        private readonly IMapper _mapper;
        private readonly MelodicDbContext _dbContext;

        public GetAllSpeakerQueryHandler(IMapper mapper, MelodicDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<List<SpeakerDto>> Handle(GetAllSpeakerQuery request, CancellationToken cancellationToken)
        {
            var query = _dbContext.Speakers
                 .AsNoTracking()
                 .AsQueryable()
                 .Where(x => x.DelFlg == 0)
                 .OrderBy(x => x.CreatedAt);

            var pageIndex = request.PageIndex == 0 ? 1 : request.PageIndex ?? 1;
            var pagination = await query.PaginatedListAsync(pageIndex, 5);

            var data = _mapper.Map<List<SpeakerDto>>(pagination.Items);
            return data;

        }
    }
}
