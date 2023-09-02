import { useParams } from 'react-router-dom'
import AppBar from '../AppBar'

import { Button } from '@mui/material'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux'
import { createCart } from '../../reducers/cartReducer'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const productList = useSelector((state) => state.product)
  const myCart = useSelector((state) => state.cart)
  const itemsInCart = myCart.items.map((item) => item.product.id)
  const product = productList.find((p) => p.id === id)

  const handleButton = () => {
    console.log('hello')
    const firstItem = {
      product: product.id,
      quantity: 1,
    }
    if (myCart === null) {
      dispatch(createCart([firstItem]))
    } else if (itemsInCart.includes(product.id)) {
      console.log('already in')
    } else {
      console.log('already created')
    }
  }
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

export default ProductDetails
