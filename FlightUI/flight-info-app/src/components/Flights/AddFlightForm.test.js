import AddFlightForm from './AddFlightForm'
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import API from '../../api'

afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('<AddFlightForm /> submits correctly', async () => {
  API.addFlight = jest.fn()
  const addFlight = jest.fn()
  const getFlights = jest.fn()

  const { findByRole, getByLabelText } = render(<AddFlightForm addFlight={addFlight} getFlights={getFlights} />)

  const submitButton = await findByRole('button', { name: 'Add' })

  fireEvent.input(getByLabelText('Flight Number:'), {
    target: {
      value: '5'
    }
  })

  fireEvent.input(getByLabelText('Destination:'), {
    target: {
      value: 'test'
    }
  })

  fireEvent.submit(submitButton)

  await waitFor(() => { })

  expect(API.addFlight).toHaveBeenCalledWith({ destination: 'test', flightNumber: '5' })
  expect(addFlight).toHaveBeenCalled()
  expect(getFlights).toHaveBeenCalled()
}
)

test('<AddFlightForm /> validation prevents submit', async () => {
  API.addFlight = jest.fn()
  const addFlight = jest.fn()
  const getFlights = jest.fn()

  const { findByRole, getByLabelText } = render(<AddFlightForm addFlight={addFlight} getFlights={getFlights} />)

  const submitButton = await findByRole('button', { name: 'Add' })

  fireEvent.input(getByLabelText('Flight Number:'), {
    target: {
      value: '7b'
    }
  })

  fireEvent.input(getByLabelText('Destination:'), {
    target: {
      value: 'test'
    }
  })

  fireEvent.submit(submitButton)

  await waitFor(() => { })

  expect(API.addFlight).not.toHaveBeenCalled()
  expect(addFlight).not.toHaveBeenCalled()
  expect(getFlights).not.toHaveBeenCalled()
}
)
