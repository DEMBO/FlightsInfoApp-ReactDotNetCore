import App from './App'
import { render, cleanup, waitFor } from '@testing-library/react'
import ShallowRenderer from 'react-shallow-renderer'
import API from './api'

afterEach(() => cleanup())

test('<App /> Renders correctly', () => expect((new ShallowRenderer()).render(<App />)).toMatchSnapshot())

test('<App /> Gets flights', async () => {
  API.getFlights = jest.fn()
  API.getFlights.mockReturnValue([
    { flightNumber: 1, destination: 'one' },
    { flightNumber: 2, destination: 'two' }
  ])

  render(<App />)

  await waitFor(() => { })

  expect(API.getFlights).toHaveBeenCalled()
  expect(document.getElementsByClassName('flight')).toHaveLength(2)
}
)
