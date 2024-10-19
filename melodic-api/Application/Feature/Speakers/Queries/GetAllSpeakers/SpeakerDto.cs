using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Feature.Brand.Queries.GetAllBrands;

namespace Application.Feature.Speakers.Queries.GetAllSpeakers
{
    public class SpeakerDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        //public Guid BrandId { get; set; }
        //public string? BrandName { get; set; }
        public BrandDto? Brand { get; set; }
        public double Price { get; set; }      
        public string? Decription { get; set; }     
        public int? UnitInStock { get; set; }
        public string? Img { get; set; }
    }
}
