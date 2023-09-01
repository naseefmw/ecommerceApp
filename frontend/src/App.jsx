import Home from './components/HomePage/Home'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import productService from './services/products'
import ProductDetails from './components/ProductPage/ProductDetails'

const App = () => {
  const [productList, setProductList] = useState(null)

  useEffect(() => {
    productService.getAllProducts().then((products) => {
      setProductList(products)
      console.log(products[0])
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home productList={productList} />} />
        <Route
          path="/details/:id"
          element={<ProductDetails productList={productList} />}
        />
      </Routes>
    </Router>
  )
}

export default App
