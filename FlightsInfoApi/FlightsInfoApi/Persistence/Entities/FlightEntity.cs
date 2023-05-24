using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using FlightsInfoApi.Models;

namespace FlightsInfoApi.Persistence.Entities
{
    public class FlightEntity
    {
        public FlightEntity() { }

        public FlightEntity(int flightNumber, string destination)
        {
            FlightNumber = flightNumber;
            Destination = destination;
        }

        public static FlightEntity FromFlight(Flight flight) => new FlightEntity(flight.FlightNumber, flight.Destination);

        [Key]
        public int FlightNumber { get; set; }
        public string Destination { get; set; }

        public ICollection<PassengerEntity> Passengers { get; set; }
    }
}
