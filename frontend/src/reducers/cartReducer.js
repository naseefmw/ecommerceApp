import { createSlice } from '@reduxjs/toolkit'
import cartService from '../services/cart'

const cartSlice = createSlice({
  name: 'cart',
  initialState: null,
  reducers: {
    setCart(state, action) {
      return action.payload
    },
    async createCart(state, action) {
      console.log(action.payload)
      const initialCart = {
        items: action.payload,
        purchaseHistory: [],
      }
      await cartService.create(initialCart).then()
      return initialCart
    },
  },
})

export const { setCart, createCart } = cartSlice.actions

export const initializeCart = () => {
  return async (dispatch) => {
    try {
      const myCart = await cartService.getAll()
      if (myCart) {
        dispatch(setCart(myCart))
      }
    } catch (exception) {
      console.log(exception)
    }
  }
}

export default cartSlice.reducer
