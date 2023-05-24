import axios from 'axios'

const GET_HEADERS = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}

const POST_HEADERS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

export const SERVER_URL = 'https://localhost:44305'

const API = {
  getFlights: async () => axios.get(`${SERVER_URL}/api/getFlights`, GET_HEADERS).then(r => r.data),
  addFlight: async (flight) => await axios.post(`${SERVER_URL}/api/addFlight`, flight, POST_HEADERS),
  getPassengers: async (flightNumber) => axios.get(`${SERVER_URL}/api/getPassengers?flightNumber=${flightNumber}`, GET_HEADERS).then(r => r.data),
  addPassenger: async (passenger) => await axios.post(`${SERVER_URL}/api/addPassenger`, passenger, POST_HEADERS)
}

export default API
