using BikeRental.Api.Data;
using BikeRental.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeRental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentalsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RentalsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Rental>> CreateRental(Rental rentalRequest)
        {
            try
            {
                var bike = await _context.Bikes.FindAsync(rentalRequest.BikeId);
                if (bike == null || bike.Status != BikeStatus.Available)
                {
                    return BadRequest("Bike is not available.");
                }

                if (rentalRequest.Hours < 1 || rentalRequest.Hours > 8)
                {
                    return BadRequest("Rental duration must be between 1 and 8 hours.");
                }

                var rental = new Rental
                {
                    UserId = rentalRequest.UserId,
                    BikeId = rentalRequest.BikeId,
                    Hours = rentalRequest.Hours,
                    TotalCost = bike.HourlyRate * rentalRequest.Hours,
                    Status = RentalStatus.Active,
                    StartTime = DateTime.UtcNow,
                    CreatedAt = DateTime.UtcNow
                };

                bike.Status = BikeStatus.Rented;
                _context.Rentals.Add(rental);
                await _context.SaveChangesAsync();

                return Ok(rental);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("{id}/return")]
        public async Task<IActionResult> ReturnBike(int id)
        {
            var rental = await _context.Rentals.Include(r => r.Bike).FirstOrDefaultAsync(r => r.Id == id);
            if (rental == null || rental.Status != RentalStatus.Active)
            {
                return NotFound("Active rental not found.");
            }

            rental.Status = RentalStatus.Completed;
            rental.EndTime = DateTime.UtcNow;
            
            if (rental.Bike != null)
            {
                rental.Bike.Status = BikeStatus.Available;
            }

            await _context.SaveChangesAsync();
            return Ok(rental);
        }

        [HttpGet("user/{userId}/history")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentalHistory(int userId)
        {
            return await _context.Rentals
                .Include(r => r.Bike)
                .Where(r => r.UserId == userId && r.Status != RentalStatus.Active)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
    }
}
