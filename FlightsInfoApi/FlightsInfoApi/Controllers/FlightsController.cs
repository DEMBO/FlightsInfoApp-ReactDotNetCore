using System.Collections.Generic;
using System.Threading.Tasks;
using FlightsInfoApi.Models;
using FlightsInfoApi.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace FlightsInfoApi.Controllers
{
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightsRepository _flightsRepository;

        public FlightsController(IFlightsRepository flightsRepository)
        {
            _flightsRepository = flightsRepository;
        }

        // GET: api/getFlights
        [HttpGet]
        [Route("api/getFlights")]
        [ProducesResponseType(typeof(IEnumerable<Flight>), 200)]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            var flights = await _flightsRepository.GetFlights();
            return Ok(flights);
        }

        // POST: api/addFlight
        [HttpPost]
        [Route("api/addFlight")]
        public async Task<IActionResult> AddFlight([FromBody]AddFlightRequestModel request)
        {
            if (ModelState.IsValid)
            {
                await _flightsRepository.CreateFlight(request.AsFlight());

                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}
