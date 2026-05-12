using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ServiceManager.AuditLogs;
using ServiceManager.Data;
using ServiceManager.Modules.Auth.Dtos;

namespace ServiceManager.Modules.Auth;

public class AuthService(
    ApplicationDbContext context,
    IConfiguration configuration,
    AuditLogService auditLogService
)
{
    private readonly ApplicationDbContext _context = context;
    private readonly IConfiguration _configuration = configuration;
    private readonly AuditLogService _auditLogService = auditLogService;

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(user => user.Email == dto.Email);

        if (user is null)
        {
            await _auditLogService.RegisterAsync(
                userId: null,
                action: AuditAction.FailedLogin,
                entityName: "Auth",
                description: $"Tentativa de login com email inexistente: {dto.Email}"
            );

            return null;
        }

        if (!user.IsActive)
        {
            await _auditLogService.RegisterAsync(
                userId: user.UserId,
                action: AuditAction.FailedLogin,
                entityName: "Auth",
                description: $"Tentativa de login com usuário inativo: {user.Email}"
            );

            return null;
        }

        var passwordIsValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

        if (!passwordIsValid)
        {
            await _auditLogService.RegisterAsync(
                userId: user.UserId,
                action: AuditAction.FailedLogin,
                entityName: "Auth",
                description: $"Senha inválida para o usuário: {user.Email}"
            );

            return null;
        }

        var token = GenerateToken(user);

        await _auditLogService.RegisterAsync(
            userId: user.UserId,
            action: AuditAction.Login,
            entityName: "Auth",
            description: $"Usuário {user.Email} realizou login"
        );

        return new AuthResponseDto
        {
            Token = token,
            UserId = user.UserId,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role
        };
    }

    public async Task<CurrentUserDto?> GetCurrentUserAsync(int userId)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(user => user.UserId == userId);
        
        if (user is null)
            return null;

        return new CurrentUserDto
        {
            UserId = user.UserId,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role
        };
    }

    private string GenerateToken(Users.User user)
    {
        var jwtKey = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("JWT Key não configurada.");
        
        var issuer = _configuration["Jwt:Issuer"]
            ?? throw new InvalidOperationException("JWT Issue não configurado.");
        
        var audience = _configuration["Jwt:Audience"]
            ?? throw new InvalidOperationException("JWT Audience não configurada.");

        var expiresInMinutes = int.Parse(
            _configuration["Jwt:ExpiresInMinutes"] ?? "120"
        );

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey)
        );

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256
        );

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new(ClaimTypes.Name, user.Name),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}