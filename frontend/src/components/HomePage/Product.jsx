import '../style.css'
const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt="product_image" />
      <div className="project-captions">
        <span id="product-name">{product.name}</span>
        <h4 id="product-rating">{product.rating} &#10025;</h4>
        <h2 id="product-price">&#8377; {product.price}</h2>
      </div>
    </div>
  )
}

export default Product
