import axios from 'axios'

export const reqProducts = (query) => {
  const response = axios.get(query)
  return response
}

export const reqCurrencyCoefficient = (currency) => {
  const response = axios.get(`https://api.exchangeratesapi.io/latest?symbols=${currency}`)
  return response
}
