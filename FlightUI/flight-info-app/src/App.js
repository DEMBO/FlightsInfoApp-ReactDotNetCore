import './App.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import React, { useState, useEffect } from 'react'
import 'react-tabs/style/react-tabs.css'
import Flights from './components/Flights/Flights'
import Passengers from './components/Passengers/Passengers'
import API from './api'

function App () {
  const [flights, setFlights] = useState([])

  const getFlights = async () => {
    const flights = await API.getFlights()
    setFlights(flights)
  }

  useEffect(() => {
    async function init () {
      await getFlights()
    }

    init()
  }, [])

  const flightNumbers = flights.map((f) => f.flightNumber)

  return (
    <div className="App">
      <h1>Flight Info App</h1>
      <Tabs>
        <TabList>
          <Tab>Flights</Tab>
          <Tab>Passengers</Tab>
        </TabList>
        <TabPanel>
          <Flights
            flights={flights}
            getFlights={getFlights}
            setFlights={setFlights}
          />
        </TabPanel>
        <TabPanel>
          {flightNumbers && flightNumbers.length > 0
            ? (
            <Passengers flightNumbers={flightNumbers} />
              )
            : (
            <h2>Add at least one flight first.</h2>
              )}
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
