import '../style.css'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { increaseQuantity } from '../../reducers/cartReducer'

const Order = ({ item }) => {
  const dispatch = useDispatch()
  const handlePlus = async (event) => {
    event.preventDefault()
    console.log('plus')
    dispatch(increaseQuantity(item))
  }
  const handleMinus = () => {
    console.log('plus')
  }
  const handleRemove = () => {
    console.log('plus')
  }
  if (item.product) {
    return (
      <div>
        {item.product.name} {item.quantity}
        <Button onClick={handlePlus}>plus</Button>
        <Button onClick={handleMinus}>minus</Button>
        <Button onClick={handleRemove}>remove</Button>
      </div>
    )
  }
}

export default Order
