namespace FlightsInfoApi.Models
{
    public class Flight
    {
        public Flight(int flightNumber, string destination)
        {
            FlightNumber = flightNumber;
            Destination = destination;
        }

        public int FlightNumber { get; }
        public string Destination { get; }
    }
}
