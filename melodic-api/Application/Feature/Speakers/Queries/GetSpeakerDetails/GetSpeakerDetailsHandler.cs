using Application.Exception;
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

namespace Application.Feature.Speakers.Queries.GetSpeakerDetails
{
    public class GetSpeakerDetailsHandler : IRequestHandler<GetSpeakerDetailsQuery, SpeakerDetailsDto>
    {
        private readonly IMapper _mapper;
        private readonly MelodicDbContext _dbContext;

        public GetSpeakerDetailsHandler(IMapper mapper, MelodicDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<SpeakerDetailsDto> Handle(GetSpeakerDetailsQuery request, CancellationToken cancellationToken)
        {
            var speaker = await _dbContext.Speakers.Include(s => s.Brand).AsNoTracking().FirstOrDefaultAsync(x => x.Id == request.Id && x.DelFlg == 0, cancellationToken: cancellationToken);
            ;

            if(speaker == null)
                throw new NotFoundException(nameof(Speaker), request.Id);

            var data = _mapper.Map<SpeakerDetailsDto>(speaker);


            return data;

        }
    }
}
