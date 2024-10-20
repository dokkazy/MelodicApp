using Application.Exception;
using Application.Feature.Brand.Commands.DeleteBrand;
using Domain.Entities;
using Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Commands.DeleteSpeaker
{
    public class DeleteSpeakerCommandHandler : IRequestHandler<DeleteSpeakerCommand, Unit>
    {
        private readonly MelodicDbContext _dbContext;

        public DeleteSpeakerCommandHandler(MelodicDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteSpeakerCommand request, CancellationToken cancellationToken)
        {
            var speaker = await _dbContext.Speakers.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (speaker == null)
                throw new NotFoundException(nameof(Speaker), request.Id);

            speaker.DelFlg = 1;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
