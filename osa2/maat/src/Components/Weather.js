import React from 'react'

const WeatherInfo = ({loc, weather}) => {
  return (
    <div>
      <h3>Weather in {loc}</h3>
      <b>Temperature: </b> {weather.current.temperature} degrees Celsius <br />
      <b>Wind: </b> {weather.current.wind_speed} kph, direction {weather.current.wind_dir}
    </div>
  )
}

export default WeatherInfo;