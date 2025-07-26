using Microsoft.EntityFrameworkCore;
using LeaveManagement.API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LeaveManagement.API.Data;

public class LeaveManagementContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
{
    public LeaveManagementContext(DbContextOptions<LeaveManagementContext> options)
        : base(options) { }

    public DbSet<LeaveRequest> LeaveRequests { get; set; }
    public DbSet<LeaveBalance> LeaveBalances { get; set; }
    public DbSet<Holiday> Holidays { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Holiday>()
            .HasKey(h => h.Id);
        builder.Entity<Holiday>()
            .Property(h => h.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<LeaveRequest>()
            .HasOne(r => r.User)
            .WithMany(u => u.LeaveRequests)
            .HasForeignKey(r => r.UserId);
        builder.Entity<LeaveBalance>()
            .HasOne(b => b.User)
            .WithOne(u => u.LeaveBalance)
            .HasForeignKey<LeaveBalance>(b => b.UserId);
    }
}