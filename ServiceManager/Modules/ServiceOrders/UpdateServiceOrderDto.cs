using System.ComponentModel.DataAnnotations;

namespace ServiceManager.ServiceOrders;

public class UpdateServiceOrderDto
{
    [MaxLength(150)]
    public string? Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    public ServiceOrderType? Type { get; set; }

    public ServiceOrderStatus? Status { get; set; }

    public ServiceOrderExecutionMode? ExecutionMode { get; set; }

    public DateTime? ScheduledStartAt { get; set; }

    public DateTime? ScheduledEndAt { get; set; }
}