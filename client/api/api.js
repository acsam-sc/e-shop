import axios from 'axios'

const reqProducts = (query) => {
  const response = axios.get(`http://localhost:8087/api/v1/products?${query}`)
  return response
}

export default reqProducts
