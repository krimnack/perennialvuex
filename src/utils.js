import { countries } from './constants/constants'

export const dateConverter = (datevalue = '') => {
  const date = new Date(datevalue)

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }

  const formattedDate = date.toLocaleString('en-IN', options).replace(',', ' at')

  return formattedDate
}

export const countriesObject = Object.keys(countries).map((c) => {
  return { name: `${c}`, code: countries[c] }
})
