using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace LeaveManagement.API.Data.Entities;

public class ApplicationUser : IdentityUser<int>
{
    public string FullName { get; set; }
    public ICollection<LeaveRequest> LeaveRequests { get; set; }
    public LeaveBalance LeaveBalance { get; set; }
}