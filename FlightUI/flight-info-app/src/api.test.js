import { cleanup, waitFor } from '@testing-library/react'
import axios from 'axios'
import API, { SERVER_URL } from './api'

jest.mock('axios')

afterEach(() => cleanup())

test('API get flights', async () => {
  const mockedGet = axios.get.mockResolvedValue({
    data: [
      { flightNumber: 1, destination: 'one' },
      { flightNumber: 2, destination: 'two' }
    ]
  })

  const flights = await API.getFlights()

  await waitFor(() => {
    expect(mockedGet).toHaveBeenCalledWith(
      `${SERVER_URL}/api/getFlights`,
      { headers: { 'Access-Control-Allow-Origin': '*' } })

    expect(flights).toHaveLength(2)
  })
}
)
