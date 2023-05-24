using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FlightsInfoApi.Models;
using FlightsInfoApi.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlightsInfoApi.Persistence
{
    public class FlightsRepository : IFlightsRepository
    {
        private readonly IMapper _mapper;
        private readonly FlightsInfoDbContext _context;

        public FlightsRepository(IMapper mapper, FlightsInfoDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task CreateFlight(Flight flight)
        {
            var entity = _mapper.Map<FlightEntity>(flight);

            var flightEntity = await _context.Flights.FindAsync(entity.FlightNumber);
            if (flightEntity != null)
            {
                throw new ArgumentException($"Flight {flight.FlightNumber} already exists");
            }

            await _context.Flights.AddAsync(entity);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteFlight(int flightNumber)
        {
            var entity = await _context.Flights.FindAsync(flightNumber);

            if (entity != null)
            {
                _context.Flights.Remove(entity);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<Flight> GetFlight(int flightNumber)
        {
            var flightEntity = await _context.Flights.FindAsync(flightNumber);
            await _context.Entry(flightEntity)
                .Collection(f => f.Passengers)
                .LoadAsync();
            var flight = _mapper.Map<Flight>(flightEntity);

            return flight;
        }

        public async Task<IEnumerable<Flight>> GetFlights()
        {
            var flightEntities = await _context.Flights.ToArrayAsync();

            var flights = _mapper.Map<IEnumerable<Flight>>(flightEntities);

            return flights;
        }
    }
}
