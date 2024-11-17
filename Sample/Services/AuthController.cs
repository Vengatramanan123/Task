using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Sample.Data;
using Sample.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Sample.Services
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;
        public AuthController(IConfiguration config, ApplicationDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("Login")]
        public IActionResult Login(User login)
        {
            if(login == null || String.IsNullOrEmpty(login.username) || String.IsNullOrEmpty(login.password))
            {
                return BadRequest("Email and Password is Required");
            }

            var user = AuthenticateLogin(login);

            if (user != null)
            {
                // Generate JWT token
                var token = GenerateToken(user);
                return Ok(new
                {
                    username = login.username,
                    message = "Logged In Successfully",
                    token = token
                });
            }
            else
            {
                return Unauthorized(new { message = "Invalid Credentials" });
            }
        }

        private Login AuthenticateLogin(User Logindetails)
        {
            var Loginuser = _context.Login.FirstOrDefault(a => a.Email == Logindetails.username);

            if(Loginuser != null)
            {
                if(Loginuser.password == Logindetails.password)
                {
                    return new Login
                    {
                        Email = Loginuser.Email
                    };
                }
            }

            return null;
        }

        private string GenerateToken(Login login)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var Credintials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["JWT:Issuer"], _config["JWT:Audience"], null,
                expires: DateTime.Now.AddMinutes(2), signingCredentials: Credintials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("logout")]
        public IActionResult logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Logout Successfully !!" });
        }
    }
}
