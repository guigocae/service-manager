using ServiceManager.Users;

namespace ServiceManager.Modules.Auth.Dtos;

public class CurrentUserDto
{
    public int UserId { get; set; }

    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

    public UserRole Role { get; set; }
}