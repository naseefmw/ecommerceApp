import AppBar from '../AppBar'
import '../style.css'
import Order from './Order'

const Cart = ({ user, cart }) => {
  if (user && cart) {
    return (
      <>
        <AppBar />
        <div className="cart">
          cart
          {cart.map((item) => (
            <Order key={item.product.id} item={item} />
          ))}
        </div>
      </>
    )
  } else return null
}

export default Cart
