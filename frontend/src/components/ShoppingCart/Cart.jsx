import AppBar from '../AppBar'

import '../style.css'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

const Order = ({ item }) => {
  const handlePlus = async (event) => {
    event.preventDefault()
    console.log('plus')
    //dispatch(increaseQuantity(item.product.id))
  }
  const handleMinus = () => {
    console.log('plus')
  }
  const handleRemove = () => {
    console.log('plus')
  }
  return (
    <div>
      {item.product.name} {item.quantity}
      <Button onClick={handlePlus}>plus</Button>
      <Button onClick={handleMinus}>minus</Button>
      <Button onClick={handleRemove}>remove</Button>
    </div>
  )
}
const Cart = ({ user }) => {
  //const dispatch = useDispatch()
  const myCart = useSelector((state) => state.cart)
  if (user === null) {
    console.log('login')
    return null
  } else if (myCart) {
    console.log(myCart)
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
