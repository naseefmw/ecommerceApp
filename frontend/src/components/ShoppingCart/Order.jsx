import '../style.css'
import { Button } from '@mui/material'
import cartService from '../../services/cart'
import { useState } from 'react'
const Order = ({ item, setCart, cart }) => {
  const [count, setCount] = useState(item.quantity)

  const handlePlus = () => {
    if (count < 5) {
      const newState = {
        product: item.product.id,
        quantity: count + 1,
      }
      cartService.update(item.id, newState)
      const newCart = { ...item, quantity: count + 1 }
      setCount(count + 1)
      setCart(cart.map((i) => (i.id === item.id ? newCart : i)))
    } else {
      console.log('max')
    }
  }
  const handleMinus = () => {
    if (count > 1) {
      const newState = {
        product: item.product.id,
        quantity: count - 1,
      }
      cartService.update(item.id, newState)
      const newCart = { ...item, quantity: count - 1 }
      setCount(count - 1)
      setCart(cart.map((i) => (i.id === item.id ? newCart : i)))
    } else {
      console.log('min')
    }
  }
  const handleRemove = () => {
    cartService.remove(item.id)
    setCart(cart.filter((i) => i.id !== item.id))
  }
  if (item.product) {
    return (
      <div>
        {item.product.name} {count}
        <Button onClick={handlePlus}>plus</Button>
        <Button onClick={handleMinus}>minus</Button>
        <Button onClick={handleRemove}>remove</Button>
      </div>
    )
  }
}

export default Order
