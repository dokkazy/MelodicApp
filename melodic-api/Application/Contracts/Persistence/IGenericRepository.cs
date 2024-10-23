using Domain.Common;

namespace Application.Contracts.Persistence;

public interface IGenericRepository<T> where T : AuditableEntity
{
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<T> GetByIdAsync(Guid id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}