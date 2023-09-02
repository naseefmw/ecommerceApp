import { useParams } from 'react-router-dom'
import AppBar from '../AppBar'
import { addToCart } from '../../reducers/cartReducer'
import { Button } from '@mui/material'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = ({ user, productList }) => {
  const dispatch = useDispatch()

  const id = useParams().id
  const myCart = useSelector((state) => state.cart)
  const product = productList.find((p) => p.id === id)

  //const itemsInCart = myCart.
  const handleButton = (event) => {
    event.preventDefault()
    const itemsInCart = myCart.map((item) => item.product.id)
    console.log('hello')
    if (itemsInCart.includes(product.id)) {
      console.log('in cart')
    } else {
      dispatch(addToCart(product))
    }
  }
  if (product) {
    return (
      <>
        <AppBar />
        <div className="productdetails">
          <span>{product.name}</span>
          <Button onClick={handleButton}>Add to Cart</Button>
        </div>
      </>
    )
  } else {
    return null
  }
}

export default ProductDetails
