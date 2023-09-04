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
      <div className="orderbox">
        <img src={item.product.image} alt="product_image" />
        <div className="orderdetails">
          <span>{item.product.name}</span>
          <span> &#8377; {item.product.price}</span>
          <div className="buttons">
            <Button variant="contained" color="inherit" onClick={handleMinus}>
              -
            </Button>
            <span id="count">{count}</span>

            <Button onClick={handlePlus} color="inherit" variant="contained">
              +
            </Button>

            <Button variant="outlined" color="error" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Order
