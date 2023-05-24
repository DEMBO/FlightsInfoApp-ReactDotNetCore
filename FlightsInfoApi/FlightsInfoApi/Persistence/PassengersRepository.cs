using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FlightsInfoApi.Models;
using FlightsInfoApi.Persistence.Entities;

namespace FlightsInfoApi.Persistence
{
    public class PassengersRepository : IPassengersRepository
    {
        private readonly IMapper _mapper;
        private readonly FlightsInfoDbContext _context;

        public PassengersRepository(IMapper mapper, FlightsInfoDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task CreatePassenger(Passenger passenger)
        {
            var flightEntity = await _context.Flights.FindAsync(passenger.FlightNumber);
            if (flightEntity == null)
            {
                throw new ArgumentException($"Flight {passenger.FlightNumber} does not exist");
            }

            await _context.Entry(flightEntity)
                .Collection(f => f.Passengers)
                .LoadAsync();

            var passengerEntity = _mapper.Map<PassengerEntity>(passenger);
            if (flightEntity.Passengers.Any(p => p.Equals(passengerEntity)))
            {
                throw new ArgumentException($"Passenger {passengerEntity.Id} already exists on {passenger.FlightNumber} flight");
            }

            await _context.Passengers.AddAsync(passengerEntity);

            flightEntity.Passengers.Add(passengerEntity);

            await _context.SaveChangesAsync();
        }

        public async Task DeletePassenger(Passenger passenger)
        {
            var entityToFind = _mapper.Map<PassengerEntity>(passenger);
            var entity = await _context.Passengers.FindAsync(entityToFind.Id, entityToFind.FlightNumber);

            if (entity != null)
            {
                _context.Passengers.Remove(entity);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Passenger>> GetPassengersByFlightNumber(int flightNumber)
        {
            var flightEntity = await _context.Flights.FindAsync(flightNumber);
            if (flightEntity == null)
            {
                throw new ArgumentException($"Flight {flightNumber} does not exist");
            }

            await _context.Entry(flightEntity)
                .Collection(f => f.Passengers)
                .LoadAsync();

            var passengers = _mapper.Map<IEnumerable<Passenger>>(flightEntity.Passengers);

            return passengers;
        }
    }
}
