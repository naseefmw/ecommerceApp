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
      const initialCart = {
        items: action.payload,
        purchaseHistory: [],
      }
      await cartService.create(initialCart).then()
      return initialCart
    },
    async updateCart(state) {
      try {
        console.log('test1')
        await cartService.update(state).then()
      } catch (exception) {
        console.log(exception)
      }
    },
    async increaseQuantity(state, action) {
      const id = action.payload
      const itemToChange = state.items.find((item) => item.product.id === id)
      const updatedItem = {
        ...itemToChange,
        quantity: itemToChange.quantity + 1,
      }
      const updatedItems = state.items.map((item) =>
        item.product.id === id ? updatedItem : item
      )

      const updatedState = {
        ...state,
        items: updatedItems,
      }
      await cartService.update(updatedState).then()
      return updatedState
    },
  },
})

export const { setCart, createCart, increaseQuantity, updateCart } =
  cartSlice.actions

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
