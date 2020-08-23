import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './Components/Country'
import {Filter} from './Components/Misc'

const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [filteringString, setFilteringString] = useState('')
  
  useEffect(() => {
    console.log("fetching countries")
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      console.log("countries fetched")
      setCountries(response.data)
    })
  }, [])

  const filterCountries = (event) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setSelectedCountries(filteredCountries)
    setFilteringString(event.target.value)
  }

  return (
    <div className="App">
      <h1>Country data</h1>
      <Filter value={filteringString} handleChange={filterCountries}/>
      <CountryInfo filteredCountries={selectedCountries} filteringString={filteringString} setSelectedCountries={setSelectedCountries}/>
    </div>
  );
}

export default App;
