using Application.ExtensionMethods;
using AutoMapper;
using Domain.Entities;
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
    public class GetAllSpeakerQueryHandler : IRequestHandler<GetAllSpeakerQuery, PaginatedList<SpeakerDto>>
    {
        private readonly IMapper _mapper;
        private readonly MelodicDbContext _dbContext;

        public GetAllSpeakerQueryHandler(IMapper mapper, MelodicDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<PaginatedList<SpeakerDto>> Handle(GetAllSpeakerQuery request, CancellationToken cancellationToken)
        {
            var query = _dbContext.Speakers
                .AsNoTracking()
                .Where(x => x.DelFlg == 0)
                .OrderBy(x => x.CreatedAt);

            var pageIndex = request.PageIndex == 0 ? 1 : request.PageIndex ?? 1;
            var pagination = await PaginatedList<Speaker>.CreateAsync(query, pageIndex, 5);

            // Ánh xạ từ PaginatedList<Speaker> sang PaginatedList<SpeakerDto>
            var data = _mapper.Map<PaginatedList<SpeakerDto>>(pagination);

            return data;
        }
    }
}
