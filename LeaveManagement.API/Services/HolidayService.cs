using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagement.API.Data;
using LeaveManagement.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace LeaveManagement.API.Services
{
    public class HolidayService : IHolidayService
    {
        private readonly LeaveManagementContext _db;
        public HolidayService(LeaveManagementContext db) => _db = db;

        public async Task<IEnumerable<Holiday>> GetAllAsync() =>
            await _db.Holidays.AsNoTracking().ToListAsync();

        public async Task<bool> ExistsAsync(DateTime date) =>
            await _db.Holidays.AnyAsync(h => h.Date == date.Date);
    }
}
