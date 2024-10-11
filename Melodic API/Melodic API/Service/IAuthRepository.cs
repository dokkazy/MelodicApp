using FirstAPI.Models;

namespace FirstAPI.Service;

public interface IAuthRepository
{
    Task<APIResponse<Token>> Login(string username, string password);
}
