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

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, newObject, config)
  return response.then((response) => {
    return response.data
  })
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken,
  remove,
}
