using Domain.Entities;

namespace Application.Contracts.Persistence;

public interface ISpeakerRepository : IGenericRepository<Speaker>
{
    Task<Speaker> GetSpeakerDetails(Guid id);
}