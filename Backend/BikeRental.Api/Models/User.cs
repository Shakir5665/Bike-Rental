using System.ComponentModel.DataAnnotations;

namespace BikeRental.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime StartTime { get; set; }

        // Navigation property
        public ICollection<Rental> Rentals { get; set; } = new List<Rental>();
    }
}
