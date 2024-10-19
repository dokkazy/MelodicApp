using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Commands.UpdateSpeaker
{
    public class UpdateSpeakerCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public Guid BrandId { get; set; }
        public double Price { get; set; }
        public string? Decription { get; set; }
        public int? UnitInStock { get; set; }
        public string? Img { get; set; }
    }
}
