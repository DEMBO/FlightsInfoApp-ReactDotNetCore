using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FlightsInfoApi.Models;

namespace FlightsInfoApi.Persistence.Entities
{
    public class PassengerEntity
    {
        public PassengerEntity() { }

        public PassengerEntity(string firstName, string lastName, int id, FlightClass flightClass, int ticketPrice)
        {
            FirstName = firstName;
            LastName = lastName;
            Id = id;
            FlightClass = flightClass;
            TicketPrice = ticketPrice;
        }

        public static PassengerEntity FromPassenger(Passenger passenger) => 
            new PassengerEntity(
                passenger.FirstName, 
                passenger.LastName,
                passenger.Id,
                passenger.FlightClass, 
                passenger.TicketPrice);

        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Key]
        [Column(Order = 1)]
        public int Id { get; set; }
        public FlightClass FlightClass { get; set; }
        public int TicketPrice { get; set; }

        [Key]
        [Column(Order = 2)]
        public int FlightNumber { get; set; }

        [ForeignKey("FlightNumber")]
        public FlightEntity Flight { get; set; }

        public override bool Equals(object obj)
        {
            if ((obj == null) || this.GetType() != obj.GetType())
            {
                return false;
            }
            else {
                PassengerEntity p = (PassengerEntity)obj;
                return (FirstName == p.FirstName) 
                       && (LastName == p.LastName) 
                       && (Id == p.Id) 
                       && (FlightClass == p.FlightClass) 
                       && (TicketPrice == p.TicketPrice);
            }
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
