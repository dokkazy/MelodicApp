using Application.Contracts.Persistence;
using Application.Exception;
using Domain.Entities;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class SpeakerRepository : GenericRepository<Speaker>, ISpeakerRepository
{
    public SpeakerRepository(MelodicDbContext context) : base(context)
    {
    }

    public async Task<Speaker> GetSpeakerDetails(Guid id)
    {
        var speaker = await _context
            .Speakers.Include(s => s.Brand).AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if(speaker == null)
            throw new NotFoundException(nameof(Speaker), id);
        return speaker;
    }
}
