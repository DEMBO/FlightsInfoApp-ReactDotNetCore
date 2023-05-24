using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace FlightsInfoApi.Models
{
    public class AddFlightRequestModel
    {
        public AddFlightRequestModel()
        {
        }

        /// <summary>
        /// Add flight request.
        /// </summary>
        /// <param name="flightNumber">Flight number.</param>
        /// <param name="destination">Destination</param>
        [JsonConstructor]
        public AddFlightRequestModel(int flightNumber, string destination)
        {
            FlightNumber = flightNumber;
            Destination = destination;
        }

        [Required]
        public int FlightNumber { get; set; }

        [Required]
        public string Destination { get; set; }

        public Flight AsFlight() => new Flight(FlightNumber, Destination);
    }
}
