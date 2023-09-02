import '../style.css'
import { Button } from '@mui/material'
import cartService from '../../services/cart'
import { useState } from 'react'
const Order = ({ item, setTrigger }) => {
  const [count, setCount] = useState(item.quantity)
  const handlePlus = async () => {
    const newState = {
      product: item.product.id,
      quantity: count + 1,
    }
    setCount(count + 1)
    await cartService.update(item.id, newState)
    setTrigger(count)
  }
  const handleMinus = async () => {
    const newState = {
      product: item.product.id,
      quantity: count - 1,
    }
    setCount(count - 1)
    await cartService.update(item.id, newState)
    setTrigger(count)
  }
  const handleRemove = async () => {
    await cartService.remove(item.id)
    setTrigger(item.id)
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
