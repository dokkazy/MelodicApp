

using Domain.Common;

namespace Domain.Entities
{
    public class Cart : AuditableEntity
    {
        public Guid UserId { get; set; }
        public Guid SpeakerId { get; set; }
       
        public int? Quantity { get; set; }
    }

    
}
