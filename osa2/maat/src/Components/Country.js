import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button} from './Misc'
import WeatherInfo from './Weather'

const CountryInfo = ({filteredCountries, filteringString, setSelectedCountries}) => {
  console.log(filteredCountries.length)
  console.log(filteringString)

  const handleShowButton = (event) => {
    event.preventDefault()
    setSelectedCountries(filteredCountries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log(event.target.value)
  }

  if (filteringString === '') {
    return (
      null
    )    

  } else if (filteredCountries.length > 10 && filteringString !== '') {
    return (
      <div>
        <p>Too much results!</p>
      </div>
    )

  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <CountryList filteredCountries={filteredCountries} handleShowButton={handleShowButton} />
    )

  } else if (filteredCountries.length === 1){
    const theCountry = filteredCountries[0]
    return (
      <SingleCountry theCountry={theCountry} />
    )
      
  } else {
    return (
      <div>
          No results.
      </div>
    )
  }
}
  
const CountryList = ({filteredCountries, handleShowButton}) => {
  return(  <div>
    <table>
      <tbody>
        {filteredCountries.map(country => 
        <tr key={country.name}>
          <td>{country.name}</td>
          <td><Button text="Show" value={country.name} handleClick={handleShowButton}/></td>
        </tr>)}
      </tbody>
    </table>
  </div>  
  )  
}

const SingleCountry = ({theCountry}) => {
  const [weather, setWeather] = useState(0)
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  console.log("api key: ", api_key)
  const weatherUrl = "http://api.weatherstack.com/current"
  const params = {
    access_key: api_key,
    query: theCountry.capital
  }

  useEffect(() => {
    console.log("fetching weather")
    axios.get(weatherUrl, {params})
    .then(response => {
      console.log("weather fetched: ", response.data)
      setWeather(response.data)

    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (weather.current) {
    return (
      <div>
        <SingleCountryBasicInfo theCountry={theCountry} />
        <WeatherInfo loc={theCountry.capital} weather={weather} />
      </div>    
    ) 
  } else {
    return (
      <div>
        <SingleCountryBasicInfo theCountry={theCountry} />
      </div>    
    )
  }
}

const SingleCountryBasicInfo = ({theCountry}) => {
  return (
    <div>
      <h2>{theCountry.name}</h2>
      <b>Capital:</b> {theCountry.capital}<br />
      <b>Population:</b> {theCountry.population}<br />
      <b>Languages:</b>
      <ul>
        {theCountry.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <b>Flag</b><br />
      <img src={theCountry.flag} width="10%" height="10%" alt="Flag of {theCountry.name}"></img>
    </div>
  )
}

export default CountryInfo;