using BikeRental.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BikeRental.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Bike> Bikes { get; set; }
        public DbSet<Rental> Rentals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data
            modelBuilder.Entity<Bike>().HasData(
                new Bike { Id = 1, Name = "Mountain Pro X", Type = "Mountain", HourlyRate = 8.00m, Status = BikeStatus.Available, ImageUrl = "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=400" },
                new Bike { Id = 2, Name = "Trail Blazer", Type = "Mountain", HourlyRate = 8.00m, Status = BikeStatus.Available, ImageUrl = "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=400" },
                new Bike { Id = 3, Name = "Road King", Type = "Road", HourlyRate = 10.00m, Status = BikeStatus.Available, ImageUrl = "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400" },
                new Bike { Id = 4, Name = "Speedster", Type = "Road", HourlyRate = 10.00m, Status = BikeStatus.Available, ImageUrl = "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=400" },
                new Bike { Id = 5, Name = "E-Glide 3000", Type = "Electric", HourlyRate = 15.00m, Status = BikeStatus.Available, ImageUrl = "https://images.unsplash.com/photo-1571068316344-75bc76f77891?auto=format&fit=crop&q=80&w=400" },
                new Bike { Id = 6, Name = "City Cruiser", Type = "City", HourlyRate = 6.00m, Status = BikeStatus.Available, ImageUrl = "https://images.unsplash.com/photo-1507139958848-df3ef215bff1?auto=format&fit=crop&q=80&w=400" }
            );

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Demo User", Email = "demo@bikerentals.com", Phone = "555-1234" }
            );
        }
    }
}
