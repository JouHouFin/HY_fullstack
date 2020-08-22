import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({filteredCountries, filteringString}) => {
  console.log(filteredCountries.length)
  console.log(filteringString)

  if (filteredCountries.length > 10 && filteringString !== '') {
    return (
      <div>
        <p>Too much results</p>
      </div>
    )
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        <ul>
          {filteredCountries.map(country => <li key={country.name}>{country.name}</li>)}
        </ul>
      </div>    
    )
  } else if (filteredCountries.length === 1){
    const theCountry = filteredCountries[0]
    return (
      <div>
        <h2>{theCountry.name}</h2>
        <p><b>Capital:</b> {theCountry.capital}</p>
        <p><b>Population:</b> {theCountry.population}</p>
        <b>Languages:</b>
        <ul>
          {theCountry.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <p><b>Flag</b></p>
        <img src={theCountry.flag} width="10%" height="10%" alt="Flag of {theCountry.name}"></img>
      </div>    
    )    
  } else if (filteringString === '') {
    return (
      null
    )    
  } else {
    return (
      null
    )        
  }
}

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
      <h1>Search for a country</h1>
      <form>
        <input placeholder="Start typing" onChange={filterCountries}></input>
      </form>
      <CountryInfo filteredCountries={selectedCountries} filteringString={filteringString}/>
    </div>
  );
}

export default App;
