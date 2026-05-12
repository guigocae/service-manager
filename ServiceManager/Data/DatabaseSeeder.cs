using Microsoft.EntityFrameworkCore;
using ServiceManager.Users;

namespace ServiceManager.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await context.Database.MigrateAsync();

        var hasUsers = await context.Users.AnyAsync();

        if (hasUsers)
            return;
        
        var admin = new User
        {
            Name = "Admin",
            Email = "admin@servicemanager.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
            Role = UserRole.Admin,
            IsActive = true
        };

        context.Users.Add(admin);

        await context.SaveChangesAsync();
    }
}