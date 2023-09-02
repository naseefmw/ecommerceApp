import AppBar from '../AppBar'

import '../style.css'
import { useSelector } from 'react-redux'
import Order from './Order'

const Cart = ({ user }) => {
  //const dispatch = useDispatch()
  const myCart = useSelector((state) => state.cart)
  if (user && myCart) {
    return (
      <>
        <AppBar />
        <div className="cart">
          cart
          {myCart.map((item) => (
            <Order key={item.product.id} item={item} />
          ))}
        </div>
      </>
    )
  } else return null
}

export default Cart
