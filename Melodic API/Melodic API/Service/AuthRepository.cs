using Azure.Core;
using FirstAPI.Data;
using FirstAPI.Models;
using FirstAPI.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FirstAPI.Service;

public class AuthRepository : IAuthRepository
{
    private readonly ApplicationDbContext _db;
    private readonly JwtSetting _setting;

    public AuthRepository(ApplicationDbContext db, IOptionsMonitor<JwtSetting> optionsMonitor)
    {
        _db = db;
        _setting = optionsMonitor.CurrentValue;

    }
    public async Task<APIResponse<Token>> Login(string username, string password)
    {
        var response = new APIResponse<Token>();
        var user = await _db.Customer
                .FirstOrDefaultAsync(obj => obj.UserName.Equals(username)
                && obj.Password.Equals(password));
        if (user is null)
        {
            response.Success = false;
            response.Message = "User not found.";
        }
        else
        {
            response.Data = await GenerateToken(user);
        }
        return response;
    }
    private async Task<Token> GenerateToken(Customer cus)
    {
        var claims = new List<Claim>
            {
             new Claim(ClaimTypes.Email, cus.Gmail),
             new Claim("UserName", cus.UserName),
             new Claim("Id", cus.ID.ToString()),
             new Claim(JwtRegisteredClaimNames.Email, cus.Gmail),
             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
             //roles

            };
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var secretKeyBytes = Encoding.UTF8.GetBytes(_setting.SecretKey);
        var tokenDescription = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddSeconds(20),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature)
        };

        var token = jwtTokenHandler.CreateToken(tokenDescription);
        var accessToken = jwtTokenHandler.WriteToken(token);
        var refreshToken = GenerateRefreshToken();

        await SaveRefreshToken(cus, token, refreshToken);

        return new Token()
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    private async Task SaveRefreshToken(Customer cus, SecurityToken token, string refreshToken)
    {
        var refreshTokenEntity = new RefreshToken
        {
            Id = Guid.NewGuid(),
            JwtId = token.Id,
            UserId = cus.ID,
            Token = refreshToken,
            IsUsed = false,
            IsRevoked = false,
            IssuedAt = DateTime.UtcNow,
            ExpiredAt = DateTime.UtcNow.AddHours(1)
        };
        await _db.RefreshToken.AddAsync(refreshTokenEntity);
        await _db.SaveChangesAsync();
    }

    private string GenerateRefreshToken()
    {
        var random = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(random);

            return Convert.ToBase64String(random);
        }
    }
}
