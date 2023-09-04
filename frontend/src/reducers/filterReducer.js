const initialState = {
  SEARCH: '',
  SORT: 'RATING',
  BRAND: 'ALL',
  PRICE: 'ALL',
  CATEGORY: 'ALL',
}
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return { ...state, SEARCH: action.payload }
    case 'SORT_BY':
      return { ...state, SORT: action.payload }
    case 'BRAND':
      return { ...state, BRAND: action.payload }
    case 'PRICE':
      return { ...state, PRICE: action.payload }
    case 'CATEGORY':
      return { ...state, CATEGORY: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const searchFor = (filter) => {
  return {
    type: 'SEARCH',
    payload: filter,
  }
}
export const sortBy = (filter) => {
  return {
    type: 'SORT_BY',
    payload: filter,
  }
}
export const setBrand = (filter) => {
  return {
    type: 'BRAND',
    payload: filter,
  }
}
export const setCategory = (filter) => {
  return {
    type: 'CATEGORY',
    payload: filter,
  }
}
export const priceRange = (filter) => {
  return {
    type: 'PRICE',
    payload: filter,
  }
}
export const reset = () => {
  return {
    type: 'RESET',
  }
}
export default filterReducer
