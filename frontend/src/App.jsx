import Home from './components/HomePage/Home'
import { useState, useEffect } from 'react'
import productService from './services/products'

const App = () => {
  const [productList, setProductList] = useState(null)

  useEffect(() => {
    productService.getAllProducts().then((products) => {
      setProductList(products)
      console.log(products[0])
    })
  }, [])

  return (
    <>
      {' '}
      <Home productList={productList} />
    </>
  )
}

export default App
