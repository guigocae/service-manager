using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceManager.Modules.Auth.Dtos;

namespace ServiceManager.Modules.Auth;

[ApiController]
[Route("[controller]")]
public class AuthController(AuthService authService) : ControllerBase
{
    private readonly AuthService _authService = authService;

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var response = await _authService.LoginAsync(dto);

        if (response is null)
            return Unauthorized(new { message = "Email ou senha inválidos. "});
        
        return Ok(response);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<CurrentUserDto>> Me()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userIdClaim is null)
            return Unauthorized();
        
        var userId = int.Parse(userIdClaim);
        var user = await _authService.GetCurrentUserAsync(userId);

        if (user is null)
            return Unauthorized();

        return Ok(user);
    }
}