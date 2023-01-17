import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ city, lat, lon }) => {
  // state hooks
  const [weather, setWeather] = useState({})
  const [weatherAPIStatus, setWeatherAPIStatus] = useState(false)

  // effect hooks
  useEffect(
    () => {
      const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI}`
      axios
        .get(weatherURL)
        .then(
          response => {
            console.log('status weather api', response.status)
            setWeatherAPIStatus(response.status === 200)
            setWeather(response.data)
          }
        )
        // eslint-disable-next-line
    }, []
  )

  if (weatherAPIStatus) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <div>temperature {Math.round(weather.main.temp - 273.15)} °Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <div>No data available</div>
      </div>
    )
  }

}

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
      <img src={country.flags.svg} alt='country flag' height='150x' />
      <Weather city={country.capital[0]} lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
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
            <CountrySelection key={country.name.common} country={country} />
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

  // effect hooks
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
