import AppBar from '../AppBar'
import '../style.css'
import Order from './Order'

const Cart = ({ user, cart, setCart }) => {
  if (user && cart) {
    return (
      <>
        <AppBar />
        <div className="cart">
          cart
          {cart.map((item) => (
            <Order key={item.id} item={item} setCart={setCart} cart={cart} />
          ))}
        </div>
      </>
    )
  } else return null
}

export default Cart
