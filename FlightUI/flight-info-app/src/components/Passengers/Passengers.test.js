import Passengers from './Passengers'
import { render, cleanup, waitFor } from '@testing-library/react'
import API from '../../api'

afterEach(() => cleanup())

test('<Passengers /> Gets passengers', async () => {
  API.getPassengers = jest.fn()
  const flightNumbers = [1, 2]

  const passengersByFlights = {
    1: [
      { firstName: 'a', lastName: 'a', id: '0', flightClass: '0', ticketPrice: '1' },
      { firstName: 'a', lastName: 'a', id: '1', flightClass: '0', ticketPrice: '1' }
    ],
    2: [
      { firstName: 'b', lastName: 'a', id: '2', flightClass: '0', ticketPrice: '1' }
    ]
  }

  API.getPassengers.mockImplementation(f => passengersByFlights[f])

  render(<Passengers flightNumbers={flightNumbers}/>)

  await waitFor(() => { })

  expect(API.getPassengers).toHaveBeenCalled()
  expect(document.getElementsByClassName('passenger')).toHaveLength(2)
}
)
