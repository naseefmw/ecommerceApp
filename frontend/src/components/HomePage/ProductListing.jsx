import '../style.css'
import Product from './Product'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProductListing = ({ productList }) => {
  const navigate = useNavigate()
  const handleButton = (id) => {
    navigate(`/details/${id}`)
  }
  return (
    <div className="productlist">
      {productList.map((product) => (
        <Button key={product.id} onClick={() => handleButton(product.id)}>
          <Product product={product} />
        </Button>
      ))}
    </div>
  )
}

export default ProductListing
