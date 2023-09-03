import AppBar from '../AppBar'
import '../style.css'
import Order from './Order'

const Cart = ({ cart, setCart, user, setUser }) => {
  return (
    <>
      <AppBar user={user} setUser={setUser} />
      <div className="cartandprices">
        <div className="cart">
          cart
          {cart.map((item) => (
            <Order key={item.id} item={item} setCart={setCart} cart={cart} />
          ))}
        </div>
        <div className="prices">
          price items {cart.reduce((t, a) => t + a.quantity, 0)}
          price totes
          {cart.reduce((t, a) => t + a.quantity * a.product.price, 0)}
        </div>
      </div>
    </>
  )
}

export default Cart
