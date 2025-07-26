using System;

namespace LeaveManagement.API.Data.Entities;

public class LeaveRequest
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public ApplicationUser User { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Days { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}