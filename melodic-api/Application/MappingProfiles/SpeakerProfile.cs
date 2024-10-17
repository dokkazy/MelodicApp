using Application.Feature.Speakers.Queries.GetAllSpeakers;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MappingProfiles
{
    public class SpeakerProfile : Profile
    {
        public SpeakerProfile()
        {
            //getall
            CreateMap<SpeakerDto, Speaker>().ReverseMap();
        }
    }
}
