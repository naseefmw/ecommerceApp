import '../style.css'
import AppBar from '../AppBar'
import ProductListing from './ProductListing'
import { useSelector } from 'react-redux'

const Home = () => {
  //const dispatch = useDispatch()
  const productList = useSelector((state) => state.product)

  return (
    <>
      <AppBar />
      <ProductListing productList={productList} />
    </>
  )
}

export default Home
