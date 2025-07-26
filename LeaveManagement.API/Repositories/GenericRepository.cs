using Microsoft.EntityFrameworkCore;
using LeaveManagement.API.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagement.API.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly LeaveManagementContext _context;
    protected readonly DbSet<T> _dbSet;

    public GenericRepository(LeaveManagementContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
    public async Task<T> GetByIdAsync(int id) => await _dbSet.FindAsync(id);
    public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
    public void Update(T entity) => _dbSet.Update(entity);
    public void Delete(T entity) => _dbSet.Remove(entity);
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
}