import axios from 'axios'

const serverURL = window.location.origin

export const reqProducts = (query) => {
  const response = axios.get(`${serverURL}/api/v1/products?${query}`)
  return response
}

export const reqCurrencyCoefficient = (currency) => {
  const response = axios.get(`${serverURL}/api/v1/exchangerate?currency=${currency}`)
  return response
}

export const postLog = (action) => {
  const response = axios.post(`${serverURL}/api/v1/logs`, { action })
  return response
}

export const getLogs = async () => {
  const response = await axios.get(`${serverURL}/api/v1/logs`)
  return response
}
