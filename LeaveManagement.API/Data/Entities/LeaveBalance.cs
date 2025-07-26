namespace LeaveManagement.API.Data.Entities;

public class LeaveBalance
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public ApplicationUser User { get; set; }
    public int EntitledDays { get; set; }
    public int UsedDays { get; set; }
}