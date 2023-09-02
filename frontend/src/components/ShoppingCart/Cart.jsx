import AppBar from '../AppBar'
import '../style.css'
import Order from './Order'

const Cart = ({ user, cart, setTrigger }) => {
  if (user && cart) {
    return (
      <>
        <AppBar setTrigger={setTrigger} />
        <div className="cart">
          cart
          {cart.map((item) => (
            <Order key={item.product.id} item={item} setTrigger={setTrigger} />
          ))}
        </div>
      </>
    )
  } else return null
}

export default Cart
