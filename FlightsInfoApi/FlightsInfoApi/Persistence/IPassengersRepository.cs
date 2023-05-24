using System.Collections.Generic;
using System.Threading.Tasks;
using FlightsInfoApi.Models;

namespace FlightsInfoApi.Persistence
{
    public interface IPassengersRepository
    {
        public Task CreatePassenger(Passenger passenger);

        public Task DeletePassenger(Passenger passenger);

        public Task<IEnumerable<Passenger>> GetPassengersByFlightNumber(int flightNumber);
    }
}
