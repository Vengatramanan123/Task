using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sample.Data;
using Sample.Models;
using System.Linq;

namespace Sample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _mydb;

        public LoginController(ApplicationDbContext mydb)
        {
            _mydb = mydb;
        }

        [HttpGet("menus")]
        public IActionResult menus()
        {
            return Ok();
        }

        [HttpPost("register")]
        public IActionResult Register(Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _mydb.Login.FirstOrDefault(b => b.Email == login.Email);

            if (user == null)
            {
                _mydb.Login.Add(new Login
                {
                    userId = Guid.NewGuid(),
                    user_name = login.user_name,
                    password = login.password,
                    Name = login.Name,
                    Email = login.Email,
                    PhoneNo = login.PhoneNo,
                    Hashed_password = login.Hashed_password,
                    user_type = login.user_type
                });
                _mydb.SaveChanges();
                return Ok("User Registered Successfully");
            }
            else
            {
                return BadRequest("User Already Exists");
            }
        }
        
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var users = _mydb.Login.ToList();
            return Ok(users);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _mydb.Login.FirstOrDefault(f => f.id == id);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
