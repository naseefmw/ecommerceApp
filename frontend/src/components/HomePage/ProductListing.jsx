import '../style.css'
import Product from './Product'
const ProductListing = ({ productList }) => {
  return (
    <div className="productlist">
      {productList.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductListing
