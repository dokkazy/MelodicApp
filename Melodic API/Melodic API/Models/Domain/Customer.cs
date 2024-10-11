using System.ComponentModel.DataAnnotations;

namespace FirstAPI.Models.Domain
{
    public class Customer
    {
        [Key]
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
       
        public string Gmail { get; set; }

    }
}
