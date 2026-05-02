using BikeRental.Api.Data;
using BikeRental.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeRental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BikesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BikesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<Bike>>> GetAvailableBikes()
        {
            return await _context.Bikes
                .Where(b => b.Status == BikeStatus.Available)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bike>> GetBike(int id)
        {
            var bike = await _context.Bikes.FindAsync(id);
            if (bike == null) return NotFound();
            return bike;
        }
    }
}
