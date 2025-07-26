using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LeaveManagement.API.Data.Entities;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Linq;

namespace LeaveManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userMgr;
    private readonly IConfiguration _config;

    public AuthController(UserManager<ApplicationUser> userMgr, IConfiguration config)
    {
        _userMgr = userMgr;
        _config = config;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var user = new ApplicationUser 
        { 
            UserName = dto.Username, 
            Email = dto.Email, 
            FullName = dto.FullName 
        };
        var result = await _userMgr.CreateAsync(user, dto.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);
        await _userMgr.AddToRoleAsync(user, "User");
        return Ok();
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userMgr.FindByNameAsync(dto.Username);
        if (user == null || !await _userMgr.CheckPasswordAsync(user, dto.Password))
            return Unauthorized();

        var roles = await _userMgr.GetRolesAsync(user);
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            //new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            //new Claim(ClaimTypes.Role, roles.First())
            new Claim("userId", user.Id.ToString()),
            new Claim("role", roles.First())
        };

        var jwt = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddMinutes(double.Parse(jwt["DurationInMinutes"]!));

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: creds
        );

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}

// DTOs
public record RegisterDto(string Username, string Email, string FullName, string Password);
public record LoginDto(string Username, string Password);