import AddPassengerForm from './AddPassengerForm'
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import API from '../../api'

afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

const correctForm = [
  { id: 'firstName', name: 'First Name:', value: 'a' },
  { id: 'lastName', name: 'Last Name:', value: 'a' },
  { id: 'id', name: 'Id:', value: '1' },
  { id: 'ticketPrice', name: 'Ticket Price:', value: '1' },
  { id: 'numberOfBags', name: 'Number Of Bags:', value: '1' },
  { id: 'totalWeight', name: 'Total Weight:', value: '1' }
]

test('<AddPassengerForm /> submits correctly', async () => {
  API.addPassenger = jest.fn()
  const addPassenger = jest.fn()
  const getPassengers = jest.fn()
  const passengersForFlight = []
  const flightNumbers = [1]
  const selectedFlightNumber = 1
  const selectFlightNumber = jest.fn()

  const { findByRole, getByLabelText } = render(<AddPassengerForm
    addPassenger={addPassenger}
    getPassengers={getPassengers}
    passengersForFlight={passengersForFlight}
    flightNumbers={flightNumbers}
    selectedFlightNumber={selectedFlightNumber}
    selectFlightNumber={selectFlightNumber}
  />)

  const submitButton = await findByRole('button', { name: 'Add' })

  correctForm.forEach(f => fireEvent.input(getByLabelText(f.name), {
    target: {
      value: f.value
    }
  }))

  fireEvent.submit(submitButton)

  await waitFor(() => { })
  const expectForm = { flightClass: 1, flightNumber: 1, ...correctForm.reduce((acum, { id, value }) => ({ ...acum, [id]: value }), {}) }
  expect(API.addPassenger).toHaveBeenCalledWith(expectForm)
  expect(addPassenger).toHaveBeenCalled()
  expect(getPassengers).toHaveBeenCalled()
}
)

test('<AddPassengerForm /> validation prevents submit', async () => {
  API.addPassenger = jest.fn()
  const addPassenger = jest.fn()
  const getPassengers = jest.fn()
  const passengersForFlight = []
  const flightNumbers = [1]
  const selectedFlightNumber = 1
  const selectFlightNumber = jest.fn()

  const { findByRole, getByLabelText } = render(<AddPassengerForm
    addPassenger={addPassenger}
    getPassengers={getPassengers}
    passengersForFlight={passengersForFlight}
    flightNumbers={flightNumbers}
    selectedFlightNumber={selectedFlightNumber}
    selectFlightNumber={selectFlightNumber}
  />)

  const submitButton = await findByRole('button', { name: 'Add' })

  const incorrectForm = [...correctForm, { id: 'numberOfBags', name: 'Number Of Bags:', value: '5' }]

  incorrectForm.forEach(f => fireEvent.input(getByLabelText(f.name), {
    target: {
      value: f.value
    }
  }))

  fireEvent.submit(submitButton)

  await waitFor(() => { })

  expect(API.addPassenger).not.toHaveBeenCalled()
  expect(addPassenger).not.toHaveBeenCalled()
  expect(getPassengers).not.toHaveBeenCalled()
}
)
