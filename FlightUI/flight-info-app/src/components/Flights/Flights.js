import React from 'react'
import PropTypes from 'prop-types'
import AddFlightForm from './AddFlightForm'
import './flights.scss'

const Flight = ({ flightNumber, destination }) => (
  <div className="row flight">
    <div className="column">{flightNumber} </div>
    <div className="column">{destination} </div>
  </div>
)

Flight.propTypes = {
  flightNumber: PropTypes.number.isRequired,
  destination: PropTypes.string.isRequired
}

const Flights = ({ flights, getFlights, setFlights }) => {
  const addFlight = (flightNumber, destination) =>
    setFlights([...flights, { flightNumber, destination }])

  return (
    <div className="flights">
      <div className="add-flight">
        <AddFlightForm addFlight={addFlight} getFlights={getFlights} />
      </div>
      <br />
      <div>Flights:</div>
      <div className="table">
        <div className="row">
          <div className="column">flightNumber </div>
          <div className="column">destination </div>
        </div>
        {flights && flights.map((f) => <Flight key={f.flightNumber} {...f} />)}
      </div>
    </div>
  )
}

Flights.propTypes = {
  flights: PropTypes.array,
  getFlights: PropTypes.func.isRequired,
  setFlights: PropTypes.func.isRequired
}

export default Flights
