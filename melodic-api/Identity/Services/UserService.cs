using System.Security.Claims;
using Application.Identity;
using Application.Models.Identity;
using Identity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Identity.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<User> GetUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        return new User
        {
            Email = user.Email,
            Id = user.Id,
            Firstname = user.FirstName,
            Lastname = user.LastName
        };
    }
    
    public async Task<User> GetUser()
    {
        var user = await _userManager.FindByIdAsync(UserId);
        return new User
        {
            Email = user.Email,
            Id = user.Id,
            Firstname = user.FirstName,
            Lastname = user.LastName
        };
    }

    public string UserId { get => _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid"); }

    public async Task<List<User>> GetUsers()
    {
        var employees = await _userManager.GetUsersInRoleAsync("User");
        return employees.Select(q => new User
        {
            Id = q.Id,
            Email = q.Email,
            Firstname = q.FirstName,
            Lastname = q.LastName
        }).ToList();
    }
}