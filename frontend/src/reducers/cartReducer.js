import { createSlice } from '@reduxjs/toolkit'
import cartService from '../services/cart'

const cartSlice = createSlice({
  name: 'cart',
  initialState: null,
  reducers: {
    setCart(state, action) {
      return action.payload
    },
    addToCart(state, action) {
      const item = action.payload
      state.push({
        item,
      })
      cartService.create(item)
    },
  },
})

export const { setCart, addToCart } = cartSlice.actions

export const initializeCart = () => {
  return async (dispatch) => {
    const myCart = await cartService.getAll()

    dispatch(setCart(myCart))
  }
}

export default cartSlice.reducer
