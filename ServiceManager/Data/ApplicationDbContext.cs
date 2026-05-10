using Microsoft.EntityFrameworkCore;
using ServiceManager.Users;
using ServiceManager.AuditLogs;
using ServiceManager.ServiceOrders;

namespace ServiceManager.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<ServiceOrder> ServiceOrders => Set<ServiceOrder>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(user => user.Name)
                .HasMaxLength(100);
            
            entity.Property(user => user.Email)
                .HasMaxLength(150);

            entity.Property(user => user.PasswordHash)
                .HasMaxLength(255);

            entity.Property(user => user.Role)
                .HasConversion<string>()
                .HasMaxLength(50);

            entity.Property(user => user.IsActive)
                .HasDefaultValue(true);

            entity.HasIndex(user => user.Email)
                .IsUnique();
        });

        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.Property(log => log.Action)
                .HasConversion<string>()
                .HasMaxLength(50);
            
            entity.Property(log => log.EntityName)
                .HasMaxLength(100);

            entity.Property(log => log.EntityId)
                .HasMaxLength(100);

            entity.Property(log => log.Description)
                .HasMaxLength(500);

            entity.HasOne(log => log.User)
                .WithMany()
                .HasForeignKey(log => log.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<ServiceOrder>(entity =>
        {
            entity.Property(order => order.Title)
                .HasMaxLength(150);
            
            entity.Property(order => order.Description)
                .HasMaxLength(1000);

            entity.Property(order => order.Type)
                .HasConversion<string>()
                .HasMaxLength(50);

            entity.Property(order => order.Status)
                .HasConversion<string>()
                .HasMaxLength(50);

            entity.Property(order => order.ExecutionMode)
                .HasConversion<string>()
                .HasMaxLength(50);

            entity.HasOne(order => order.CreatedByUser)
                .WithMany()
                .HasForeignKey(order => order.CreatedByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(order => order.UpdatedByUser)
                .WithMany()
                .HasForeignKey(order => order.UpdatedByUserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
        });
    }

    public override async Task<int> SaveChangesAsync(
        CancellationToken cancellationToken = default
    )
    {
        var now = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added)
            {
                if (entry.Properties.Any(p => p.Metadata.Name == "CreatedAt"))
                    entry.Property("CreatedAt").CurrentValue = now;
                
                if (entry.Properties.Any(p => p.Metadata.Name == "UpdatedAt"))
                    entry.Property("UpdatedAt").CurrentValue = null;
            }

            if (entry.State == EntityState.Modified)
            {
                if (entry.Properties.Any(p => p.Metadata.Name == "UpdatedAt"))
                    entry.Property("UpdatedAt").CurrentValue = now;

                if (entry.Properties.Any(p => p.Metadata.Name == "CreatedAt"))
                    entry.Property("CreatedAt").IsModified = false;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}