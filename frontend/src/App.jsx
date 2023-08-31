import Home from './components/HomePage/Home'
import { useState, useEffect } from 'react'

const App = () => {
  const [products, setProducts] = useState(null)

  //useEffect()

  return (
    <>
      <Home />
    </>
  )
}

export default App
