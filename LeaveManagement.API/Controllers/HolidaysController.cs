using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LeaveManagement.API.Services;
using LeaveManagement.API.Models;     
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class HolidaysController : ControllerBase
{
    private readonly IHolidayService _holidaySvc;
    public HolidaysController(IHolidayService holidaySvc) => _holidaySvc = holidaySvc;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var holidays = await _holidaySvc.GetAllAsync();
        var dtos = holidays.Select(h => new HolidayDto
        {
            Date = h.Date.ToString("yyyy-MM-dd"),
            Name = h.Name
        });
        return Ok(dtos);
    }
}
