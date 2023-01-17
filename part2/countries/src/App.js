import { useEffect, useState } from "react"
import axios from "axios"

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital[0]}
      </div>
      <div>
        area {country.area}
      </div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((language) => {
          return (
            <li key={language}>{language}</li>
          )
        })}

      </ul>
      <img src={country.flags.svg} alt='country flag' height='200px' />
    </div>
  )
}

const CountrySelection = ({ country }) => {
  // state hooks
  const [showInfo, setShowInfo] = useState(false)

  // event handlers
  const buttonHandler = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={buttonHandler}>{showInfo ? 'hide' : 'show'}</button>
      {showInfo ? <CountryInfo country={country} /> : <></>}
    </div>
  )
}

const Countries = ({ countryArray }) => {
  if (countryArray.length === 1) {
    const country = countryArray[0]
    return (
      <CountryInfo country={country} />
    )
  } else if (countryArray.length <= 10) {
    return (
      <div>
        {countryArray.map((country) => {
          return (
            <CountrySelection country={country} />
          )
        })}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

}

const App = () => {
  // state hooks
  const [countries, setCountries] = useState([])
  const [displayCountries, setDisplayCountries] = useState([])

  // event hooks
  useEffect(
    () => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(
          response => {
            setCountries(response.data)
          }
        )
    }, []
  )

  // event handlers
  const searchHandler = (event) => {
    const searchString = event.target.value
    const countriesFiltered = searchString === ''
      ? [...countries]
      : countries.filter((country) => country.name.common.toLowerCase().includes(searchString.toLowerCase()))
    setDisplayCountries(countriesFiltered)
  }

  return (
    <div>
      <div>
        find countries <input onChange={searchHandler} />
      </div>
      <Countries countryArray={
        countries.length === displayCountries.length ? [] : displayCountries
      } />
    </div>
  )
}

export default App
