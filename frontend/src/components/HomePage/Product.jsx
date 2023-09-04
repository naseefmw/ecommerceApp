import '../style.css'
const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt="product_image" />
      <span id="product-name">{product.name}</span>
      <h4>{product.rating} &#10025;</h4>
      <h2>&#8377; {product.price}</h2>
    </div>
  )
}

export default Product
