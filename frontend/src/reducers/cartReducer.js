import { createSlice } from '@reduxjs/toolkit'
import cartService from '../services/cart'

const cartSlice = createSlice({
  name: 'cart',
  initialState: null,

  reducers: {
    setCart(state, action) {
      return action.payload
    },
    async addToCart(state, action) {
      const response = await cartService.create({ product: action.payload.id })
      console.log(response)
    },
    increaseQuantity(state, action) {
      if (action.payload.quantity < 5) {
        const id = action.payload.id
        const changedItem = {
          product: action.payload.product,
          quantity: action.payload.quantity + 1,
        }

        const updatedItem = {
          product: action.payload.product.id,
          quantity: action.payload.quantity + 1,
        }
        cartService.update(id, updatedItem).then()
        return state.map((item) => (item.id !== id ? item : changedItem))
      } else {
        console.log('max')
      }
    },
  },
})

export const { setCart, addToCart, increaseQuantity } = cartSlice.actions

export const initializeCart = () => {
  return async (dispatch) => {
    const myCart = await cartService.getAll()

    dispatch(setCart(myCart))
  }
}

export default cartSlice.reducer
