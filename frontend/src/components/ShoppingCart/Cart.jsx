import AppBar from '../AppBar'
import '../style.css'
import Order from './Order'

const Cart = ({ cart, setCart }) => {
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
}

export default Cart
