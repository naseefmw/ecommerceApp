import { useParams } from 'react-router-dom'
import AppBar from '../AppBar'
import { Button } from '@mui/material'
import '../style.css'

const ProductDetails = ({ productList }) => {
  const id = useParams().id
  const product = productList.find((p) => p.id === id)

  const handleButton = () => {
    console.log('hello')
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
