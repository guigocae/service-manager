using ServiceManager.Users;

namespace ServiceManager.ServiceOrders;

public class ServiceOrder
{
    public int ServiceOrderId { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public ServiceOrderType Type { get; set; }
    public  ServiceOrderStatus Status { get; set; } = ServiceOrderStatus.Open;
    public ServiceOrderExecutionMode ExecutionMode { get; set; }
    public DateTime? ScheduledStartAt { get; set; }
    public DateTime? ScheduledEndAt { get; set; }
    public DateTime? ClosedAt { get; set; }
    
    public int CreatedByUserId { get; set; }
    public User CreatedByUser { get; set; } = null!;

    public int? UpdatedByUserId { get; set; }
    public User? UpdatedByUser { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public enum ServiceOrderType
{
    ExternalService,
    Assembly,
    Disassembly,
    Sale,
    Rental,
    ThecnicalSupport,
    Maintenance
}

public enum ServiceOrderStatus
{
    Open,
    Scheduled,
    InProgress,
    Closed,
    Canceled
}

public enum ServiceOrderExecutionMode
{
    OnSite,
    Remote
}