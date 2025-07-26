using System;

namespace LeaveManagement.API.Models
{
    public class LeaveRequestDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } 
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Days { get; set; }
        public string Status { get; set; }
    }
}
