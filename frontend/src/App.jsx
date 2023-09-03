import Home from './components/HomePage/Home'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import cartService from './services/cart'
import productService from './services/products'
import ProductDetails from './components/ProductPage/ProductDetails'
import Register from './components/LoginPage/Register'
import Login from './components/LoginPage/Login'
import Cart from './components/ShoppingCart/Cart'

const App = () => {
  const [user, setUser] = useState(null)
  const [productList, setProductList] = useState([])
  const [myCart, setMyCart] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookTrackerUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      cartService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    productService.getAllProducts().then((products) => setProductList(products))
  }, [])

  useEffect(() => {
    cartService.getAll().then((items) => setMyCart(items))
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home productList={productList} user={user} setUser={setUser} />
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProductDetails
              user={user}
              productList={productList}
              cart={myCart}
              setCart={setMyCart}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/cart"
          element={<Cart cart={myCart} setCart={setMyCart} />}
        />
      </Routes>
    </Router>
  )
}

export default App
