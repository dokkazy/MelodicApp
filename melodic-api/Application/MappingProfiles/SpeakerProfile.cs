using Application.Feature.Brand.Commands.CreateBrand;
using Application.Feature.Brand.Commands.UpdateBrand;
using Application.Feature.Speakers.Commands.CreateSpeaker;
using Application.Feature.Speakers.Commands.UpdateSpeaker;
using Application.Feature.Speakers.Queries.GetAllSpeakers;
using Application.Feature.Speakers.Queries.GetSpeakerDetails;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Contracts.Pagination;

namespace Application.MappingProfiles
{
    public class SpeakerProfile : Profile
    {
        public SpeakerProfile()
        {
            CreateMap<SpeakerDto, Speaker>().ReverseMap();

            CreateMap<CreateSpeakerCommand, Speaker>();
            CreateMap<UpdateSpeakerCommand, Speaker>();
            CreateMap<SpeakerDetailsDto, Speaker>().ReverseMap();

            CreateMap(typeof(PaginatedList<>), typeof(PaginatedList<>)).ConvertUsing(typeof(PaginatedListConverter<,>));
        }
    }
}
