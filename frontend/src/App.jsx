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
  const [productList, setProductList] = useState(null)
  const [myCart, setMyCart] = useState([])

  useEffect(() => {
    productService.getAllProducts().then((products) => setProductList(products))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      cartService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      cartService.getAll().then((items) => setMyCart(items))
    }
  }, [user])

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
              setUser={setUser}
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
          element={
            <Cart
              cart={myCart}
              setCart={setMyCart}
              user={user}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
