using BikeRental.Api.Data;
using BikeRental.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeRental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private const string ApiKeyHeaderName = "X-API-Key";
        private const string ValidApiKey = "admin123"; // Simple demo key

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        private bool IsAuthorized()
        {
            if (!Request.Headers.TryGetValue(ApiKeyHeaderName, out var extractedApiKey))
            {
                return false;
            }
            return ValidApiKey.Equals(extractedApiKey);
        }

        [HttpPost("bikes")]
        public async Task<ActionResult<Bike>> AddBike(Bike bike)
        {
            if (!IsAuthorized()) return Unauthorized();
            _context.Bikes.Add(bike);
            await _context.SaveChangesAsync();
            return Ok(bike);
        }

        [HttpPut("bikes/{id}")]
        public async Task<IActionResult> UpdateBike(int id, Bike bikeRequest)
        {
            if (!IsAuthorized()) return Unauthorized();
            var bike = await _context.Bikes.FindAsync(id);
            if (bike == null) return NotFound();

            bike.Name = bikeRequest.Name;
            bike.Type = bikeRequest.Type;
            bike.HourlyRate = bikeRequest.HourlyRate;
            bike.Status = bikeRequest.Status;
            bike.ImageUrl = bikeRequest.ImageUrl;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("bikes/{id}")]
        public async Task<IActionResult> DeleteBike(int id)
        {
            if (!IsAuthorized()) return Unauthorized();
            var bike = await _context.Bikes.FindAsync(id);
            if (bike == null) return NotFound();

            _context.Bikes.Remove(bike);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("rentals/all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllRentals()
        {
            if (!IsAuthorized()) return Unauthorized();
            return await _context.Rentals
                .Include(r => r.Bike)
                .Include(r => r.User)
                .Select(r => new
                {
                    r.Id,
                    r.StartTime,
                    r.EndTime,
                    r.TotalCost,
                    r.Status,
                    BikeName = r.Bike != null ? r.Bike.Name : "N/A",
                    UserName = r.User != null ? r.User.Name : "N/A",
                    r.Hours
                })
                .OrderByDescending(r => r.StartTime)
                .ToListAsync();
        }

        [HttpGet("bikes/all")]
        public async Task<ActionResult<IEnumerable<Bike>>> GetAllBikes()
        {
            if (!IsAuthorized()) return Unauthorized();
            return await _context.Bikes.ToListAsync();
        }
    }
}
