import { useState, useEffect } from 'react'
import axios from 'axios'
import { weatherCodes } from './modules/weather'

const DisplayWeather = ({ latitude, longitude, countryName }) => {
  const weatherApiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,cloudcover,windspeed_10m&current_weather=true&windspeed_unit=ms`
  const [weather, setWeather] = useState({ temperature: "", windspeed: "", weathercode: "" })

  useEffect(() => {
    axios
      .get(weatherApiURL)
      .then(response => {      
        const weatherObject = { temperature: response.data.current_weather.temperature,
          windspeed: response.data.current_weather.windspeed,
          weathercode: response.data.current_weather.weathercode }
        setWeather(weatherObject)
      })
  }, [])

  return (
    <div>
      <h3>Weather in {countryName}</h3>
      <div>temperature {weather.temperature} Celsius</div>
      <div>{weatherCodes.get(weather.weathercode)}</div>
      <div>wind {weather.windspeed} m/s</div>
    </div>
  )
}

const DisplayCountry = ({ country }) => {
  const languages = Object.entries(country.languages).map(x => {
    if (x.length === 2) {
      return { langShort: x[0], lang: x[1] }
    }
  })

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map(x => {
          return <li key={x.langShort}>{x.lang}</li>
        })}
      </ul>
      <img src={country.flags.png} />
      <DisplayWeather latitude={country.latlng[0]} longitude={country.latlng[1]} countryName={country.name.common} />
    </div>
  )
}

const DisplayCountries = ({ countries, filter, setFilter }) => {
  if (countries.length === 0 || filter === '') { return }

  const countriesFiltered = countries.filter(x => x.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (countriesFiltered.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (countriesFiltered.length === 0) {
    return <p>No matches</p>
  }
  if (countriesFiltered.length === 1) {
    return <DisplayCountry country={countriesFiltered[0]} />
  }

  return (
    <div>
      {countriesFiltered.map(x => {
        return (
          <div key={x.name.common}>{x.name.common} <button onClick={() => {
            setFilter(x.name.common)
          }}>show</button></div>
        )
      })}
    </div>
  )
}

const Filter = ({ filter, handler }) => {
  return (
    <div>
    find countries <input value={filter} onChange={handler} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handler={handleFilterChange} />
      <DisplayCountries countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App