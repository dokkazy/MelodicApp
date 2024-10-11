using System.ComponentModel.DataAnnotations;

namespace FirstAPI.Models.DTO
{
    public class LoginRequestDTO
    {
        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }
        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
