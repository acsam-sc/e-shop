import axios from 'axios'

// const instance = axios.create(
//   { withCredentials: true }
// )

export const reqProducts = (query) => {
  const response = axios.get(query)
  return response
}

export const reqCurrencyCoefficient = (currency) => {
  const response = axios.get(`https://api.exchangeratesapi.io/latest?symbols=${currency}`)
  // const response = instance.get(`https://api.ratesapi.io/api/latest?symbols=${currency}`)
  return response
}
