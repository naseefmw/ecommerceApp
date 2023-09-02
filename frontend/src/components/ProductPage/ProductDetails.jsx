import { useParams } from 'react-router-dom'
import AppBar from '../AppBar'
import { addToCart } from '../../reducers/cartReducer'
import { Button } from '@mui/material'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const productList = useSelector((state) => state.product)
  const myCart = useSelector((state) => state.cart)
  //const itemsInCart = myCart.items.map((item) => item.product.id)
  const product = productList.find((p) => p.id === id)

  const handleButton = () => {
    console.log('hello')
    const itemsInCart = myCart.map((item) => item.product.id)
    if (itemsInCart.includes(product.id)) {
      console.log('in cart')
    } else {
      dispatch(addToCart({ product: product.id }))
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
  }
}

export default ProductDetails
