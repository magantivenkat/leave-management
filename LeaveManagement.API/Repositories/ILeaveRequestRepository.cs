using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagement.API.Data.Entities;

namespace LeaveManagement.API.Repositories;

public interface ILeaveRequestRepository : IGenericRepository<LeaveRequest>
{
    Task<IEnumerable<LeaveRequest>> GetByUserAsync(int userId);
    Task<IEnumerable<LeaveRequest>> GetByTeamAsync(IEnumerable<int> userIds);
    Task<IEnumerable<LeaveRequest>> GetAllWithUserAsync();
    Task<LeaveRequest?> GetByIdWithUserAsync(int id);
}