using Application.Identity;
using Application.Models.Identity;

namespace Infrastructure.Database;

public class DefaultUserService : IUserService
{
    // Implement the methods of IUserService here
    public Task<List<User>> GetUsers()
    {
        throw new NotImplementedException();
    }

    public Task<User> GetUser(string userId)
    {
        throw new NotImplementedException();
    }

    public string UserId { get; }
}