using ServiceManager.Users;

namespace ServiceManager.AuditLogs;

public class AuditLog
{
    public int AuditLogId { get; set; }
    public int? UserId { get; set; }
    public User? User { get; set; }
    public AuditAction Action { get; set; }
    public string EntityName { get; set; } = "";
    public string? EntityId { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum AuditAction
{
    Created,
    Updated,
    Deleted,
    Closed,
    Login,
    Logout,
    FailedLogin,
    PermissionDenied,
}