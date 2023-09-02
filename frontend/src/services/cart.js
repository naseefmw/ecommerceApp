import axios from 'axios'

const baseUrl = '/api/items'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/myCart`, config)
  return request.then((response) => {
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

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
}
