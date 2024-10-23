using Application.Contracts.Persistence;
using Domain.Entities;
using Infrastructure.Database;

namespace Infrastructure.Repositories;

public class SpeakerRepository : GenericRepository<Speaker>, ISpeakerRepository
{
    public SpeakerRepository(MelodicDbContext context) : base(context)
    {
    }
}
