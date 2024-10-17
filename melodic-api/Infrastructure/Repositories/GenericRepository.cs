// using Application.Contracts.Persistence;
// using Domain.Common;
// using Infrastructure.Database;
// using Microsoft.EntityFrameworkCore;
//
// namespace Infrastructure.Repositories;
//
// public class GenericRepository<T>  where T : class
// {
//     protected readonly MelodicDbContext _context;
//
//     public GenericRepository(MelodicDbContext context)
//     {
//         _context = context;
//     }
//     public async Task<IReadOnlyList<T>> GetAllAsync()
//     {
//         return await _context.Set<T>().AsNoTracking().ToListAsync();
//     }
//
//     public async Task<T> GetByIdAsync(Guid id)
//     {
//         return await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(x => x. == id);
//     }
//
//     public async Task AddAsync(T entity)
//     {
//         await _context.Set<T>().AddAsync(entity);
//         await _context.SaveChangesAsync();
//     }
//
//     public async Task UpdateAsync(T entity)
//     {
//         _context.Entry(entity).State = EntityState.Modified;
//         await _context.SaveChangesAsync();
//     }
//
//     public async Task DeleteAsync(Guid id)
//     {
//         _context.Set<T>().Remove(await GetByIdAsync(id));
//         await _context.SaveChangesAsync();
//     }
// }