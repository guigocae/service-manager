using Microsoft.EntityFrameworkCore;
using ServiceManager.AuditLogs;
using ServiceManager.Data;

namespace ServiceManager.ServiceOrders;

public class ServiceOrdersService(
    ApplicationDbContext context,
    AuditLogService auditLogService
)
{
    private readonly ApplicationDbContext _context = context;
    private readonly AuditLogService _auditLogService = auditLogService;

    public async Task<List<ServiceOrder>> GetAllAsync()
    {
        return await _context.ServiceOrders
            .AsNoTracking()
            .Include(order => order.CreatedByUser)
            .Include(order => order.UpdatedByUser)
            .OrderByDescending(order => order.CreatedAt)
            .ToListAsync();
    }

    public async Task<ServiceOrder?> GetByIdAsync(int serviceOrderId)
    {
        return await _context.ServiceOrders
            .AsNoTracking()
            .Include(order => order.CreatedByUser)
            .Include(order => order.UpdatedByUser)
            .FirstOrDefaultAsync(order => order.ServiceOrderId == serviceOrderId);
    }

    public async Task<ServiceOrder> CreateAsync(
        CreateServiceOrderDto dto,
        int currentUserId
    )
    {
        var order = new ServiceOrder
        {
            Title = dto.Title,
            Description = dto.Description,
            Type = dto.Type,
            ExecutionMode = dto.ExecutionMode,
            ScheduledStartAt = dto.ScheduledStartAt,
            ScheduledEndAt = dto.ScheduledEndAt,
            Status = ServiceOrderStatus.Open,
            CreatedByUserId = currentUserId
        };

        _context.ServiceOrders.Add(order);
        await _context.SaveChangesAsync();

        await _auditLogService.RegisterAsync(
            userId: currentUserId,
            action: AuditAction.Created,
            entityName: "ServiceOrder",
            entityId: order.ServiceOrderId.ToString(),
            description: $"OS #{order.ServiceOrderId} foi criada"
        );

        return order;
    }

    public async Task<ServiceOrder?> UpdateAsync(
        int serviceOrderId,
        UpdateServiceOrderDto dto,
        int currentUserId
    )
    {
        var order = await _context.ServiceOrders.FindAsync(serviceOrderId);

        if (order is null)
            return null;

        if (dto.Title is not null)
            order.Title = dto.Title;

        if (dto.Description is not null)
            order.Description = dto.Description;

        if (dto.Type is not null)
            order.Type = dto.Type.Value;

        if (dto.Status is not null)
            order.Status = dto.Status.Value;

        if (dto.ExecutionMode is not null)
            order.ExecutionMode = dto.ExecutionMode.Value;

        if (dto.ScheduledStartAt is not null)
            order.ScheduledStartAt = dto.ScheduledStartAt;

        if (dto.ScheduledEndAt is not null)
            order.ScheduledEndAt = dto.ScheduledEndAt;

        order.UpdatedByUserId = currentUserId;
        order.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _auditLogService.RegisterAsync(
            userId: currentUserId,
            action: AuditAction.Updated,
            entityName: "ServiceOrder",
            entityId: order.ServiceOrderId.ToString(),
            description: $"OS #{order.ServiceOrderId} foi atualizada"
        );

        return order;
    }

    public async Task<ServiceOrder?> CloseAsync(
        int serviceOrderId,
        int currentUserId
    )
    {
        var order = await _context.ServiceOrders.FindAsync(serviceOrderId);

        if (order is null)
            return null;

        order.Status = ServiceOrderStatus.Closed;
        order.ClosedAt = DateTime.UtcNow;
        order.UpdatedAt = DateTime.UtcNow;
        order.UpdatedByUserId = currentUserId;

        await _context.SaveChangesAsync();

        await _auditLogService.RegisterAsync(
            userId: currentUserId,
            action: AuditAction.Closed,
            entityName: "ServiceOrder",
            entityId: order.ServiceOrderId.ToString(),
            description: $"OS #{order.ServiceOrderId} foi encerrada"
        );

        return order;
    }
}