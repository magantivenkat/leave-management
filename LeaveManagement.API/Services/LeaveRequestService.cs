using LeaveManagement.API.Data.Entities;
using LeaveManagement.API.Models;
using LeaveManagement.API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagement.API.Services;

public class LeaveRequestService : ILeaveRequestService
{
    private readonly ILeaveRequestRepository _repo;

    public LeaveRequestService(ILeaveRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<LeaveRequest>> GetMyRequestsAsync(int userId) =>
        await _repo.GetByUserAsync(userId);

    public async Task<IEnumerable<LeaveRequest>> GetAllRequestsAsync() =>
        await _repo.GetAllAsync();

    public async Task<IEnumerable<LeaveRequestDto>> GetTeamRequestsAsync()
    {
        var requests = await _repo.GetAllWithUserAsync();
        return requests.Select(r => new LeaveRequestDto
        {
            Id = r.Id,
            UserId = r.UserId,
            UserName = r.User.FullName,
            StartDate = r.StartDate,
            EndDate = r.EndDate,
            Days = r.Days,
            Status = r.Status
        });
    }

    public async Task<LeaveRequest> CreateRequestAsync(LeaveRequest request)
    {
        await _repo.AddAsync(request);
        await _repo.SaveChangesAsync();
        return request;
    }

    public async Task<LeaveRequest> UpdateRequestAsync(LeaveRequest request)
    {
        _repo.Update(request);
        await _repo.SaveChangesAsync();
        return request;
    }

    public async Task<bool> DeleteRequestAsync(int requestId)
    {
        var req = await _repo.GetByIdAsync(requestId);
        if (req == null) return false;
        _repo.Delete(req);
        await _repo.SaveChangesAsync();
        return true;
    }

    public async Task<LeaveRequestDto> UpdateStatusAsync(int id, string status)
    {
        var req = await _repo.GetByIdAsync(id);
        if (req == null) throw new KeyNotFoundException($"LeaveRequest {id} not found.");

        req.Status = status;
        _repo.Update(req);
        await _repo.SaveChangesAsync();

        return new LeaveRequestDto
        {
            Id = req.Id,
            UserId = req.UserId,
            UserName = (req as dynamic).User?.FullName ?? string.Empty,
            StartDate = req.StartDate,
            EndDate = req.EndDate,
            Days = req.Days,
            Status = req.Status
        };
    }

    public async Task<LeaveRequestDto> GetRequestByIdAsync(int id)
    {
        var r = await _repo.GetByIdWithUserAsync(id)
            ?? throw new KeyNotFoundException($"LeaveRequest {id} not found.");

        return new LeaveRequestDto
        {
            Id = r.Id,
            UserId = r.UserId,
            UserName = r.User.FullName,
            StartDate = r.StartDate,
            EndDate = r.EndDate,
            Days = r.Days,
            Status = r.Status
        };
    }

    public async Task<LeaveRequestDto> UpdateRequestAsync(int id, LeaveRequestDto dto)
    {
        if (id != dto.Id)
            throw new ArgumentException("ID mismatch");

        var r = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"LeaveRequest {id} not found.");

        // update only the editable fields:
        r.StartDate = dto.StartDate;
        r.EndDate = dto.EndDate;
        r.Days = dto.Days;
        // keep Status as-is (or allow changing here if desired)

        _repo.Update(r);
        await _repo.SaveChangesAsync();

        // you might reload with User included, but for now:
        return dto;
    }
}