using System.Collections.Generic;
using System.Threading.Tasks;
using FlightsInfoApi.Models;

namespace FlightsInfoApi.Persistence
{
    public interface IFlightsRepository
    {
        public Task CreateFlight(Flight flight);

        public Task DeleteFlight(int flightNumber);

        public Task<Flight> GetFlight(int flightNumber);

        public Task<IEnumerable<Flight>> GetFlights();
    }
}
