using Microsoft.EntityFrameworkCore;
using LeaveManagement.API.Data;
using LeaveManagement.API.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagement.API.Repositories;

public class LeaveRequestRepository : GenericRepository<LeaveRequest>, ILeaveRequestRepository
{
    public LeaveRequestRepository(LeaveManagementContext context) : base(context) {}

    public async Task<IEnumerable<LeaveRequest>> GetByUserAsync(int userId) =>
        await _dbSet.Where(r => r.UserId == userId).ToListAsync();

    public async Task<IEnumerable<LeaveRequest>> GetByTeamAsync(IEnumerable<int> userIds) =>
        await _dbSet.Where(r => userIds.Contains(r.UserId)).ToListAsync();

    public async Task<IEnumerable<LeaveRequest>> GetAllWithUserAsync() =>
            await _dbSet
                  .Include(r => r.User)
                  .ToListAsync();
    public async Task<LeaveRequest?> GetByIdWithUserAsync(int id) =>
        await _dbSet
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == id);
}