using LeaveManagement.API.Data.Entities;
using LeaveManagement.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeaveManagement.API.Services;

public interface ILeaveRequestService
{
    Task<IEnumerable<LeaveRequest>> GetMyRequestsAsync(int userId);
    Task<LeaveRequest> CreateRequestAsync(LeaveRequest request);
    Task<LeaveRequest> UpdateRequestAsync(LeaveRequest request);
    Task<bool> DeleteRequestAsync(int requestId);
    Task<IEnumerable<LeaveRequestDto>> GetTeamRequestsAsync();
    Task<LeaveRequestDto> UpdateStatusAsync(int id, string status);
    Task<LeaveRequestDto> GetRequestByIdAsync(int id);
    Task<LeaveRequestDto> UpdateRequestAsync(int id, LeaveRequestDto dto);
}