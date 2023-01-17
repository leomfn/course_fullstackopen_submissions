import { useEffect, useState } from "react"
import axios from "axios"

const Countries = (props) => {
  if (props.countryArray.length <= 10) {
    return (
      <div>
        {props.countryArray.map((country) => {
          return (
            <li key={country.cioc}>
              {country.name.common}
            </li>
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
  const [searchString, setSearchString] = useState('')
  const [displayCountries, setDisplayCountries] = useState([])

  // event hooks
  useEffect(
    () => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(
          response => {
            console.log(response.status)
            setCountries(response.data)
          }
        )
    }, []
  )

  // event handlers
  const searchHandler = (event) => {
    setSearchString(event.target.value)
  }

  // other
  const countriesFiltered = searchString === ''
    ? [...countries]
    : countries.filter((country) => country.name.common.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <>
      <div>
        find countries <input value={searchString} onChange={searchHandler} />
      </div>
      <Countries countryArray={
        countries.length == countriesFiltered.length ? [] : countriesFiltered
      } />
    </>
  )
}

export default App
