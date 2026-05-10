using System.ComponentModel.DataAnnotations;

namespace ServiceManager.ServiceOrders;

public class CreateServiceOrderDto
{
    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = "";

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    public ServiceOrderType Type { get; set; }

    [Required]
    public ServiceOrderExecutionMode ExecutionMode { get; set; }

    public DateTime? ScheduledStartAt { get; set; }

    public DateTime? ScheduledEndAt { get; set; }
}