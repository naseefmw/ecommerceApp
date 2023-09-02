import { useParams } from 'react-router-dom'
import AppBar from '../AppBar'
import { Button } from '@mui/material'
import '../style.css'
import cartService from '../../services/cart'

const ProductDetails = ({ user, productList, cart, setTrigger }) => {
  const id = useParams().id
  const itemsInCart = cart.map((item) => item.product.id)
  const product = productList.find((p) => p.id === id)

  const handleButton = (event) => {
    event.preventDefault()

    if (itemsInCart.includes(product.id)) {
      console.log('in cart')
    } else {
      console.log('not in')
      cartService.create({ product: product.id }).then()
      setTrigger(product.id)
    }
  }
  if (product) {
    return (
      <>
        <AppBar setTrigger={setTrigger} />
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
