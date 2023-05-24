using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace FlightsInfoApi.Models
{
    public class AddPassengerRequestModel : IValidatableObject
    {
        public AddPassengerRequestModel()
        {
        }
        
        [JsonConstructor]
        public AddPassengerRequestModel(string firstName, 
            string lastName, 
            int id, 
            FlightClass flightClass, 
            int ticketPrice, 
            int flightNumber,
            int numberOfBags,
            int totalWeight)
        {
            FirstName = firstName;
            LastName = lastName;
            Id = id;
            FlightClass = flightClass;
            TicketPrice = ticketPrice;
            FlightNumber = flightNumber;
            NumberOfBags = numberOfBags;
            TotalWeight = totalWeight;
        }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public int Id { get; set; }
        [Required]
        [EnumDataType(typeof(FlightClass), ErrorMessage = "Flight Class is not correct")]
        public FlightClass FlightClass { get; set; }
        [Required]
        public int TicketPrice { get; set; }
        [Required]
        public int FlightNumber { get; set; }
        [Required]
        [Range(0,2)]
        public int NumberOfBags { get; set; }
        [Required]
        [Range(0, 30)]
        public int TotalWeight { get; set; }

        public Passenger AsPassenger() => new Passenger(FirstName, LastName, Id, FlightClass, TicketPrice, FlightNumber);
        
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (FlightClass == FlightClass.Economy && NumberOfBags > 1)
            {
                yield return new ValidationResult(
                    $"Too many bags for {FlightClass.ToString()} class.",
                    new[] { nameof(NumberOfBags) });
            }

            if (TotalWeight > 20 && (FlightClass == FlightClass.Economy || FlightClass == FlightClass.Business))
            {
                yield return new ValidationResult(
                    $"Too much weight for {FlightClass.ToString()} class.",
                    new[] { nameof(TotalWeight) });
            }
        }
    }
}
