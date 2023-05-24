using FlightsInfoApi.Models;
using FlightsInfoApi.Persistence.Entities;

namespace FlightsInfoApi
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Flight, FlightEntity>().ReverseMap();
            CreateMap<Passenger, PassengerEntity>().ReverseMap();
        }
    }
}
