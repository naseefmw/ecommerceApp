import '../style.css'
import AppBar from '../AppBar'
import ProductListing from './ProductListing'

const Home = ({ productList, user, setUser }) => {
  return (
    <>
      <AppBar user={user} setUser={setUser} />
      <ProductListing productList={productList} />
    </>
  )
}

export default Home
