using System.ComponentModel.DataAnnotations;
using Domain.Common;

namespace Domain.Entities
{
    public class EVoucher : AuditableEntity
    {
        // [Key]
        // public Guid VoucherId { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string VouncherName { get; set; }
        [Required]
        [Range(0.1, 1, ErrorMessage = "Please enter value in 0.0 - 1")]
        public double Percent { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
