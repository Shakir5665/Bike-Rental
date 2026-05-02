using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeRental.Api.Models
{
    public enum BikeStatus
    {
        Available,
        Rented,
        Maintenance
    }

    public class Bike
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Type { get; set; } = string.Empty; // Mountain, Road, Electric, City
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal HourlyRate { get; set; }
        
        public BikeStatus Status { get; set; } = BikeStatus.Available;
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        // Navigation property
        public ICollection<Rental> Rentals { get; set; } = new List<Rental>();
    }
}
