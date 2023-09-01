import '../style.css'
import AppBar from './AppBar'
import ProductListing from './ProductListing'

const Home = ({ productList }) => {
  if (productList) {
    return (
      <>
        <AppBar />
        <ProductListing productList={productList} />
      </>
    )
  }
}

export default Home
