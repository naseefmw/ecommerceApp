import axios from 'axios'

const baseUrl = ''

const getAllProducts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAllProducts }
