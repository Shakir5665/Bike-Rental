using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeRental.Api.Models
{
    public enum RentalStatus
    {
        Active,
        Completed,
        Cancelled
    }

    public class Rental
    {
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public int BikeId { get; set; }
        public Bike? Bike { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        
        [Range(1, 8)]
        public int Hours { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalCost { get; set; }
        
        public RentalStatus Status { get; set; } = RentalStatus.Active;
        public DateTime CreatedAt { get; set; }
    }
}
