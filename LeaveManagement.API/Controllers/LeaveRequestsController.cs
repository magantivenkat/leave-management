using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LeaveManagement.API.Data.Entities;
using LeaveManagement.API.Services;
using System.Threading.Tasks;
using System.Collections.Generic;
using LeaveManagement.API.Models;
using System.Security.Claims;

namespace LeaveManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LeaveRequestsController : ControllerBase
{
    private readonly ILeaveRequestService _service;
    public LeaveRequestsController(ILeaveRequestService service) => _service = service;

    [HttpGet("my/{userId}")]
    [Authorize(Roles = "User,Admin")]
    public async Task<IEnumerable<LeaveRequest>> GetMy(int userId) =>
        await _service.GetMyRequestsAsync(userId);

    [HttpGet("team")]
    [Authorize(Roles = "Admin")]
    public async Task<IEnumerable<LeaveRequestDto>> GetTeam() =>
            await _service.GetTeamRequestsAsync();

    [HttpGet("{id}")]
    [Authorize(Roles = "User,Admin")]
    public async Task<ActionResult<LeaveRequestDto>> Get(int id)
    {
        var dto = await _service.GetRequestByIdAsync(id);
        return Ok(dto);
    }

    [HttpPost]
    [Authorize(Roles = "User,Admin")]
    public async Task<ActionResult<LeaveRequest>> Create(LeaveRequest req)
    {
        var created = await _service.CreateRequestAsync(req);
        return CreatedAtAction(nameof(GetMy), new { userId = created.UserId }, created);
    }

    //[HttpPut]
    //[Authorize(Roles = "Admin")]
    //public async Task<ActionResult<LeaveRequest>> Update(LeaveRequest req)
    //{
    //var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    //if (User.IsInRole("User"))
    //{
    //    if (userIdClaim == null || existing.UserId.ToString() != userIdClaim)
    //        return Forbid();

    //    if (existing.Status != "Pending")
    //        return BadRequest("You can only edit a pending request.");
    //}
    //    var updated = await _service.UpdateRequestAsync(req);
    //    return Ok(updated);
    //}

    [HttpPut("{id}/status")]
    public async Task<ActionResult<LeaveRequestDto>> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        var updated = await _service.UpdateStatusAsync(id, dto.Status);
        return Ok(updated);
    }    

    [HttpPut("{id}")]
    [Authorize(Roles = "User,Admin")]
    public async Task<ActionResult<LeaveRequestDto>> Update(int id, [FromBody] LeaveRequestDto dto)
    {
        if (id != dto.Id)
            return BadRequest("ID mismatch.");

        var existing = await _service.GetRequestByIdAsync(id);
        if (existing == null)
            return NotFound();

        var updated = await _service.UpdateRequestAsync(id, dto);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "User,Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var req = await _service.GetRequestByIdAsync(id);
        if (req == null)
            return NotFound();
        
        var success = await _service.DeleteRequestAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }
}