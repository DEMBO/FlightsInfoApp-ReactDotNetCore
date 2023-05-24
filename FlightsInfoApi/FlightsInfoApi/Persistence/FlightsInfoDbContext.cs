using FlightsInfoApi.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlightsInfoApi.Persistence
{
    public class FlightsInfoDbContext : DbContext
    {
        public FlightsInfoDbContext(DbContextOptions<FlightsInfoDbContext> options)
            : base(options)
        {
        }

        public DbSet<FlightEntity> Flights { get; set; }
        public DbSet<PassengerEntity> Passengers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FlightEntity>()
                .HasIndex(f => f.FlightNumber)
                .IsUnique();

            modelBuilder.Entity<PassengerEntity>()
                .HasOne(p => p.Flight)
                .WithMany(f => f.Passengers)
                .HasForeignKey(p => p.FlightNumber);

            modelBuilder.Entity<PassengerEntity>()
                .HasIndex(p => new {p.Id, p.FlightNumber});
            modelBuilder.Entity<PassengerEntity>()
                .HasKey(p => new { p.Id, p.FlightNumber });
        }
    }
}
