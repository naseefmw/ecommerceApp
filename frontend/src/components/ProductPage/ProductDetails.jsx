import { useParams } from 'react-router-dom'
import AppBar from '../AppBar'
import { Button } from '@mui/material'
import '../style.css'
import cartService from '../../services/cart'

const ProductDetails = ({ user, productList, cart, setCart }) => {
  const id = useParams().id
  const itemsInCart = cart.map((item) => item.product.id)
  const product = productList.find((p) => p.id === id)

  const handleButton = () => {
    if (itemsInCart.includes(product.id)) {
      console.log('in cart')
    } else {
      console.log('not in')
      cartService
        .create({ product: product.id })
        .then((response) =>
          setCart(
            cart.concat({ product: product, quantity: 1, id: response.id })
          )
        )
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
