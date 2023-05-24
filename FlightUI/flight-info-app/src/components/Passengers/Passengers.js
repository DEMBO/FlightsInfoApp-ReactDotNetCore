import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AddPassengerForm from './AddPassengerForm'
import './passengers.scss'
import FlightClass from './FlightClass'
import API from '../../api'

const Passenger = ({ firstName, lastName, id, flightClass, ticketPrice }) => (
  <div className="row passenger">
    <div className="column">{firstName} </div>
    <div className="column">{lastName} </div>
    <div className="column">{id} </div>
    <div className="column">{FlightClass[flightClass]} </div>
    <div className="column">{ticketPrice} </div>
  </div>
)

Passenger.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  flightClass: PropTypes.number.isRequired,
  ticketPrice: PropTypes.number.isRequired
}

const Passengers = ({ flightNumbers }) => {
  const [passengersForFlight, setPassengers] = useState([])
  const [selectedFlightNumber, selectFlightNumber] = useState(
    flightNumbers ? flightNumbers[0] : -1
  )

  const getPassengers = async (flightNumber) => {
    const passenger = await API.getPassengers(flightNumber)
    setPassengers(passenger)
  }

  useEffect(() => {
    async function init () {
      await getPassengers(selectedFlightNumber)
    }

    init()
  }, [selectedFlightNumber])

  const addPassenger = (passenger) =>
    setPassengers([...passengersForFlight, passenger])

  return (
    <div className="passengers">
      <div className="add-passenger">
        <AddPassengerForm
          addPassenger={addPassenger}
          getPassengers={getPassengers}
          passengersForFlight={passengersForFlight}
          flightNumbers={flightNumbers}
          selectedFlightNumber={selectedFlightNumber}
          selectFlightNumber={selectFlightNumber}
        />
      </div>
      <br />
      <div>Passengers For Flight:</div>
      <div className="table">
        <div className="row">
          <div className="column">firstName </div>
          <div className="column">lastName </div>
          <div className="column">id </div>
          <div className="column">flightClass </div>
          <div className="column">ticketPrice </div>
        </div>
        {passengersForFlight &&
          passengersForFlight.map((p) => (
            <Passenger key={p.flightNumber + p.id} {...p} />
          ))}
      </div>
    </div>
  )
}

Passengers.propTypes = {
  flightNumbers: PropTypes.array
}

export default Passengers
