using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagement.API.Data.Entities;

namespace LeaveManagement.API.Services
{
    public interface IHolidayService
    {
        Task<IEnumerable<Holiday>> GetAllAsync();
        Task<bool> ExistsAsync(System.DateTime date);
    }
}
