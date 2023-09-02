import { createSlice } from '@reduxjs/toolkit'
import productService from '../services/products'

const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    setProductList(state, action) {
      return action.payload
    },
  },
})

export const { setProductList } = productSlice.actions

export const initializeProducts = () => {
  return async (dispatch) => {
    const products = await productService.getAllProducts()
    dispatch(setProductList(products))
  }
}

export default productSlice.reducer
