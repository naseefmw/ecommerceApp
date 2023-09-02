import Home from './components/HomePage/Home'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import productService from './services/products'
import cartService from './services/cart'
import ProductDetails from './components/ProductPage/ProductDetails'
import Register from './components/LoginPage/Register'
import Login from './components/LoginPage/Login'

const App = () => {
  const [user, setUser] = useState(null)
  const [productList, setProductList] = useState(null)

  useEffect(() => {
    productService.getAllProducts().then((products) => {
      setProductList(products)
      console.log(products[0])
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookTrackerUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      cartService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home productList={productList} />} />
        <Route
          path="/details/:id"
          element={<ProductDetails productList={productList} user={user} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  )
}

export default App
