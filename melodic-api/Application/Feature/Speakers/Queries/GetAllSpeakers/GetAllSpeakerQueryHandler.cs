using AutoMapper;
using Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Feature.Speakers.Queries.GetAllSpeakers
{
    public class GetAllSpeakerQueryHandler : IRequestHandler<GetAllSpeakerQuery, PaginatedList<SpeakerDto>>
    {
        private readonly MelodicDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetAllSpeakerQueryHandler(MelodicDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<SpeakerDto>> Handle(GetAllSpeakerQuery request, CancellationToken cancellationToken)
        {
            var query = _dbContext.Speakers.AsQueryable();

            if (!string.IsNullOrEmpty(request.speakerName))
            {
                query = query.Where(s => s.Name.Contains(request.speakerName));
            }

            query = request.sortBy switch
            {
                "name" => request.sortDirection == "asc"
                    ? query.OrderBy(s => s.Name)
                    : query.OrderByDescending(s => s.Name),
                "price" => request.sortDirection == "asc"
                    ? query.OrderBy(s => s.Price)
                    : query.OrderByDescending(s => s.Price),
                _ => query.OrderBy(s => s.Name)
            };
            var pageIndex = request.PageIndex == 0 ? 1 : request.PageIndex ?? 1;

            var paginatedList = await PaginatedList<SpeakerDto>.CreateAsync(
                _mapper.ProjectTo<SpeakerDto>(query),
                pageIndex,
                pageSize: 10
            );

            return paginatedList;
        }
    }
}
