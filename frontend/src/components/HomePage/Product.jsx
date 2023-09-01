import '../style.css'
const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt="product_image" />
      <span>{product.name}</span>
      <span>{product.brand}</span>
      <span>{product.rating}</span>
      <span>{product.price}</span>
    </div>
  )
}

export default Product
