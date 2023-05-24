using System.Text.Json.Serialization;

namespace FlightsInfoApi.Models
{
    public class Passenger
    {
        public Passenger(string firstName, string lastName, int id, FlightClass flightClass, int ticketPrice, int flightNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Id = id;
            FlightClass = flightClass;
            TicketPrice = ticketPrice;
            FlightNumber = flightNumber;
        }

        public string FirstName { get; }
        public string LastName { get; }
        public int Id { get; }
        public FlightClass FlightClass { get; }
        public int TicketPrice { get; }
        [JsonIgnore]
        public int FlightNumber { get; }
    }
}
