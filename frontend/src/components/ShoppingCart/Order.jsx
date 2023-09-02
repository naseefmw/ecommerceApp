import { Button } from '@mui/material'
import { increaseQuantity } from '../../reducers/cartReducer'
import { useDispatch } from 'react-redux'
//import { UseSelector } from 'react-redux/es/hooks/useSelector'
//import cartService from '../../services/cart'
const Order = ({ item }) => {
  const dispatch = useDispatch()

  const handlePlus = async (event) => {
    event.preventDefault()
    console.log('plus')
    dispatch(increaseQuantity(item.product.id))
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

export default Order
