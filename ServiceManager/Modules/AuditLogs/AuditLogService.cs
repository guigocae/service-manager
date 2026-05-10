using ServiceManager.Data;

namespace ServiceManager.AuditLogs;

public class AuditLogService(ApplicationDbContext context)
{
    public async Task RegisterAsync(
        int? userId,
        AuditAction action,
        string entityName,
        string? entityId = null,
        string? description = null
    )
    {
        var log = new AuditLog
        {
            UserId = userId,
            Action = action,
            EntityName = entityName,
            EntityId = entityId,
            Description = description
        };

        context.AuditLogs.Add(log);
        await context.SaveChangesAsync();
    }
}