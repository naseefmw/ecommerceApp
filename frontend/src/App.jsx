import Home from './components/HomePage/Home'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import cartService from './services/cart'
import productService from './services/products'
import ProductDetails from './components/ProductPage/ProductDetails'
import Register from './components/LoginPage/Register'
import Login from './components/LoginPage/Login'
import Cart from './components/ShoppingCart/Cart'
import { useDispatch } from 'react-redux'
import { initializeProducts } from './reducers/productReducer'
import { initializeCart } from './reducers/cartReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const [productList, setProductList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookTrackerUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      cartService.setToken(user.token)
      dispatch(initializeCart())
    }
  }, [])

  useEffect(() => {
    dispatch(initializeProducts())
    productService.getAllProducts().then((products) => setProductList(products))
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/details/:id"
          element={<ProductDetails user={user} productList={productList} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cart" element={<Cart user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
