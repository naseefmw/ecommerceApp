import AppBar from '../AppBar'
import Order from './Order'
import '../style.css'
import { useSelector } from 'react-redux'

const Cart = ({ user }) => {
  //const dispatch = useDispatch()
  const myCart = useSelector((state) => state.cart)
  if (user === null) {
    console.log('login')
    return null
  } else if (myCart !== []) {
    return (
      <>
        <AppBar />
        <div className="cart">
          cart
          {myCart.map((item) => (
            <Order key={item.id} item={item} />
          ))}
        </div>
      </>
    )
  }
}

export default Cart
