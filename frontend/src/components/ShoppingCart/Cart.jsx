import AppBar from '../AppBar'
import Order from './Order'
import '../style.css'
import { useSelector } from 'react-redux'

const Cart = ({ user }) => {
  //const dispatch = useDispatch()
  const myCart = useSelector((state) => state.cart)
  const itemsinCart = myCart.items
  if (user === null) {
    console.log('login')
    return null
  } else if (myCart !== null) {
    return (
      <>
        <AppBar />
        <div className="cart">
          cart
          {itemsinCart.map((item) => (
            <Order key={item.product.id} item={item} />
          ))}
        </div>
      </>
    )
  }
}

export default Cart
