import axios from 'axios'

const baseUrl = '/api/products'

const getAllProducts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAllProducts }
