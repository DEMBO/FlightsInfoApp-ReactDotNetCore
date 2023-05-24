using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightsInfoApi.Models;
using FlightsInfoApi.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace FlightsInfoApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly IPassengersRepository _passengersRepository;

        public PassengersController(IPassengersRepository passengersRepository)
        {
            _passengersRepository = passengersRepository;
        }

        // GET: api/getPassengers
        [HttpGet("getPassengers")]
        [ProducesResponseType(typeof(IEnumerable<Passenger>), 200)]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersByFlightNumber(int flightNumber)
        {
            var passengers = await _passengersRepository.GetPassengersByFlightNumber(flightNumber);
            return Ok(passengers);
        }

        // POST: api/addPassenger
        [HttpPost("addPassenger")]
        public async Task<ActionResult<int>> AddPassenger([FromBody]AddPassengerRequestModel request)
        {
            if (ModelState.IsValid)
            {
                var passenger = request.AsPassenger();

                var passengers = await _passengersRepository.GetPassengersByFlightNumber(passenger.FlightNumber);

                if (!IsSeatAvailable(passengers, passenger.FlightClass))
                {
                    throw new ArgumentException($"All seats for {passenger.FlightClass.ToString()} have been booked");
                }

                
                await _passengersRepository.CreatePassenger(passenger);

                var seatPlace = CalculateSeatPlace(passengers, passenger.FlightClass);

                return Ok(seatPlace);
            }

            return BadRequest(ModelState);
        }

        private bool IsSeatAvailable(IEnumerable<Passenger> passengers, FlightClass orderedClass)
        {
            var passengersForClassCount = passengers.Count(p => p.FlightClass.Equals(orderedClass));

            switch (orderedClass)
            {
                case FlightClass.First:
                    return passengersForClassCount < 20;
                case FlightClass.Business:
                    return passengersForClassCount < 30;
                case FlightClass.Economy:
                    return passengersForClassCount < 150;
                default:
                    return false;
            }
        }

        private int CalculateSeatPlace(IEnumerable<Passenger> passengers, FlightClass orderedClass)
        {
            var passengersForClassCount = passengers.Count(p => p.FlightClass.Equals(orderedClass));

            switch (orderedClass)
            {
                case FlightClass.First:
                    return passengersForClassCount + 1;
                case FlightClass.Business:
                    return passengersForClassCount + 21;
                case FlightClass.Economy:
                    return passengersForClassCount + 51;
                default:
                    return -1;
            }
        }
    }
}
