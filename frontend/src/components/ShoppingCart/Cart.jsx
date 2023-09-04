import { Button } from '@mui/material'
import AppBar from '../AppBar'
import '../style.css'
import Order from './Order'
import { useNavigate } from 'react-router-dom'

const Cart = ({ cart, setCart, user, setUser }) => {
  const navigate = useNavigate()
  const handleCheckout = () => {
    navigate('/checkout')
  }
  return (
    <>
      <AppBar user={user} setUser={setUser} />
      <div className="cartandprices">
        <div className="cart">
          My Cart
          {cart.map((item) => (
            <Order key={item.id} item={item} setCart={setCart} cart={cart} />
          ))}{' '}
          {cart.length ? null : (
            <p className="lighttext">Nothing in cart. :(</p>
          )}
        </div>
        <div className="prices">
          <p>PRICE DETAILS</p>

          <hr />
          <p>Number of items : {cart.reduce((t, a) => t + a.quantity, 0)}</p>
          <p>
            Total amount : &#8377;
            {cart.reduce((t, a) => t + a.quantity * a.product.price, 0)}
          </p>
          <hr />
          {cart.length ? (
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </Button>
          ) : (
            <Button variant="contained" color="success" size="large" disabled>
              PROCEED TO CHECKOUT
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
