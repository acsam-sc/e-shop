import axios from 'axios'

export const reqProducts = (query) => {
  const response = axios.get(query)
  return response
}

export const reqCurrencyCoefficient = (currency) => {
  const response = axios.get(`http://api.exchangeratesapi.io/latest?symbols=${currency}`)
  return response
}
