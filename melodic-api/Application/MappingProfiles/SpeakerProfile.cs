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
            CreateMap<SpeakerDto, Speaker>().ReverseMap();

            CreateMap(typeof(PaginatedList<>), typeof(PaginatedList<>)).ConvertUsing(typeof(PaginatedListConverter<,>));
        }
    }
}
