using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Exception;
using Application.Identity;
using Application.Models.Identity;
using Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Identity.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signinManager;
    private readonly JwtSettings _jwtSettings;
    public AuthService(UserManager<ApplicationUser> userManager
        , SignInManager<ApplicationUser> signinManager
        , IOptions<JwtSettings> jwtSettings)
    {
        _userManager = userManager;
        _signinManager = signinManager;
        _jwtSettings = jwtSettings.Value;
    }
    public async Task<AuthResponse> Login(AuthRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            throw new NotFoundException($"User with {request.Email} not found", request.Email);
        }
        var result = await _signinManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (!result.Succeeded)
        {
            throw new BadRequestException($"Credentials for '{request.Email} aren't valid'");
        }

        JwtSecurityToken jwtToken = await GenerateToken(user);
        var response = new AuthResponse
        {
            Id = user.Id,
            Email = user.Email,
            UserName = user.Email,
            Token = new JwtSecurityTokenHandler().WriteToken(jwtToken)
        };
        return response;
    }

    public async Task<RegistrationResponse> Register(RegistrationRequest request)
    {
        var user = new ApplicationUser
        {
            Email = request.Email,
            UserName = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            EmailConfirmed = true
        };
        
        var result = await _userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "User");
            return new RegistrationResponse() { UserId = user.Id};
        }
        else
        {
            StringBuilder errors = new StringBuilder();
            foreach (var err in result.Errors)
            {
                errors.AppendFormat("•{0}\n", err.Description);
            }
            throw new BadRequestException($"{errors}");
        }
    }

    private async Task<JwtSecurityToken> GenerateToken(ApplicationUser user)
    {
        var userClaims = await _userManager.GetClaimsAsync(user);
        var roles = await _userManager.GetRolesAsync(user);

        var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
        var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            }
            .Union(userClaims)
            .Union(roleClaims);

        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

        var jwtSecurity = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(_jwtSettings.DurationInMinutes),
            signingCredentials: signingCredentials
        );

        return jwtSecurity;
    }
}