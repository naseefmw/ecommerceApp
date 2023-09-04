import { useParams } from 'react-router-dom'
import AppBar from '../AppBar'
import { Button } from '@mui/material'
import '../style.css'
import cartService from '../../services/cart'
import { useEffect, useState } from 'react'

const ProductDetails = ({ user, productList, cart, setCart, setUser }) => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (productList) {
      setProduct(productList.find((p) => p.id === id))
    }
  }, [productList])

  const id = useParams().id
  const itemsInCart = cart.map((item) => item.product.id)

  const handleButton = () => {
    cartService
      .create({ product: product.id })
      .then((response) =>
        setCart(cart.concat({ product: product, quantity: 1, id: response.id }))
      )
  }
  if (product) {
    return (
      <>
        <AppBar user={user} setUser={setUser} />
        <div className="productdetails">
          <div className="productdetailsheader">
            <img src={product.image} alt="product_image" />
            <div className="productdetailsleft">
              <span className="productheading">{product.name}</span>
              <span id="productbrand">{product.brand}</span>
              <span id="rating"> {product.rating} &#10025;</span>
              <span className="productheading">&#8377;{product.price}</span>

              {itemsInCart.includes(product.id) ? (
                <Button variant="contained" disabled>
                  Added to Cart
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleButton}
                  size="large"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
          <br /> <br />
          <div>
            <span className="lighttext">Description:</span>
            <br />
            <span>{product.description}</span>
          </div>
        </div>
      </>
    )
  } else {
    return null
  }
}

export default ProductDetails
