import '../style.css'
import AppBar from '../AppBar'
import ProductListing from './ProductListing'
import FilterBar from './FilterBar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = ({ productList, user, setUser }) => {
  const [filteredProducts, setFilter] = useState(null)
  const searchFilter = useSelector((state) => state.SEARCH)
  const sortFilter = useSelector((state) => state.SORT)
  const brandFilter = useSelector((state) => state.BRAND)
  const priceFilter = useSelector((state) => state.PRICE)
  const categoryFilter = useSelector((state) => state.CATEGORY)

  useEffect(() => {
    setFilter(productList)
  }, [productList])

  const sortingLogic = (list) => {
    switch (sortFilter) {
      case 'DATE':
        return list.sort(
          (a, b) => new Date(b.addedDate) - new Date(a.addedDate)
        )
      case 'PRICE_ASC':
        return list.sort((a, b) => a.price - b.price)

      case 'PRICE_DESC':
        return list.sort((a, b) => b.price - a.price)

      case 'RATING':
        return list.sort((a, b) => b.rating - a.rating)

      default:
        return list
    }
  }

  const priceRangeFilter = (list) => {
    switch (priceFilter) {
      case 'U10K':
        return list.filter((p) => p.price < 10000)
      case '10K20K':
        return list.filter((p) => p.price >= 10000 && p.price < 20000)

      case '20K50K':
        return list.filter((p) => p.price >= 20000 && p.price < 50000)
      case 'O50K':
        return list.filter((p) => p.price >= 50000)
      default:
        return list
    }
  }
  useEffect(() => {
    if (productList) {
      let filteredData
      filteredData = productList.filter((product) =>
        product.name.toLowerCase().includes(searchFilter.toLowerCase())
      )

      if (categoryFilter !== 'ALL') {
        filteredData = filteredData.filter(
          (product) => product.category === categoryFilter
        )
      }

      if (brandFilter !== 'ALL') {
        filteredData = filteredData.filter(
          (product) => product.brand === brandFilter
        )
      }

      if (priceFilter !== 'ALL') {
        filteredData = priceRangeFilter(filteredData)
      }

      filteredData = sortingLogic(filteredData)

      setFilter(filteredData)
    }
  }, [
    searchFilter,
    sortFilter,
    brandFilter,
    priceFilter,
    productList,
    categoryFilter,
    priceRangeFilter,
  ])

  return (
    <>
      <FilterBar />
      <AppBar user={user} setUser={setUser} show={true} />

      <ProductListing productList={filteredProducts} />
    </>
  )
}

export default Home
