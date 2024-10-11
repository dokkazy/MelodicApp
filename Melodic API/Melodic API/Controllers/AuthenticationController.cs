using FirstAPI.Data;
using FirstAPI.Models.DTO;
using FirstAPI.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FirstAPI.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IAuthRepository _auth;

        public AuthenticationController(ApplicationDbContext db,IAuthRepository auth)
        {
            _db = db;
            _auth = auth;
        }

        // POST api/<LoginController>
        [HttpPost("LoginTest")]
        public async Task<IActionResult> ValidateLogin([FromBody] LoginRequestDTO request)
        {
            var response = await _auth.Login(request.UserName,request.Password);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }
    }
}
