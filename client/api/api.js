import axios from 'axios'

export const reqProducts = (query) => {
  const response = axios.get(query)
  return response
}

export const reqCurrencyCoefficient = (requestURL, currency) => {
  const response = axios.get(`${requestURL}/api/v1/exchangerate?currency=${currency}`)
  return response
}
