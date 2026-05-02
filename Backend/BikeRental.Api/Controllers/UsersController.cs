using BikeRental.Api.Data;
using BikeRental.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeRental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User userRequest)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Name == userRequest.Name);
            if (existingUser != null)
            {
                return Ok(existingUser);
            }

            var user = new User
            {
                Name = userRequest.Name,
                Email = userRequest.Email,
                Phone = userRequest.Phone
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
        }

        [HttpGet("{id}/rentals/active")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetActiveRentals(int id)
        {
            return await _context.Rentals
                .Include(r => r.Bike)
                .Where(r => r.UserId == id && r.Status == RentalStatus.Active)
                .ToListAsync();
        }
    }
}
