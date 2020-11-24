import axios from 'axios'

const reqProducts = () => {
  const response = axios.get('http://localhost:8087/api/v1/products')
  return response
}

export default reqProducts
