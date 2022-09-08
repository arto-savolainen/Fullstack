import { useState, useEffect } from 'react'
import axios from 'axios'

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
    </div>
  )
}

const DisplayCountries = ({ countries, filter }) => {
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
      {countriesFiltered.map(x => <p key={x.name.common}>{x.name.common}</p>)}
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
      <DisplayCountries countries={countries} filter={filter} />
    </div>
  )
}

export default App