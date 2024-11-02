using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Application.Feature.Speakers.Commands.CreateSpeaker
{
    public class CreateSpeakerCommand : IRequest<Unit>
    {
        //public Guid Id { get; set; }
        public string? Name { get; set; }
        public Guid BrandId { get; set; }
        public double? Price { get; set; }
        public string? Decription { get; set; }
        public int? UnitInStock { get; set; }
        public string? MainImg { get; set; }

    }
}
