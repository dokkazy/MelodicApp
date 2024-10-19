using Application.Feature.Brand.Queries.GetAllBrands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Queries.GetSpeakerDetails
{
    public class SpeakerDetailsDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        //public Guid BrandId { get; set; }
        //brand
        public BrandDto? Brand { get; set; }

        public double Price { get; set; }
        public string? Decription { get; set; }
        public int? UnitInStock { get; set; }
        public string? Img { get; set; }
    }
}
