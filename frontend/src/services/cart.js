import axios from 'axios'

const baseUrl = '/api/carts'
let token = null
let cartId = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/myCart`, config)
  return request.then((response) => {
    cartId = response.data.id.toString()
    return response.data
  })
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${cartId}`, newObject, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
}
