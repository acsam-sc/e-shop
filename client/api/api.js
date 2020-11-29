import axios from 'axios'

const serverURL = window.location.origin

export const reqProducts = (query) => {
  const response = axios.get(`${serverURL}${query}`)
  return response
}

export const reqCurrencyCoefficient = (currency) => {
  const response = axios.get(`${serverURL}/api/v1/exchangerate?currency=${currency}`)
  return response
}
