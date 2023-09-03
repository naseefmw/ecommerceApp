import '../style.css'
import AppBar from '../AppBar'
import ProductListing from './ProductListing'
import FilterBar from './FilterBar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = ({ productList, user, setUser }) => {
  const [filteredProducts, setFilter] = useState(productList)
  const searchFilter = useSelector((state) => state.SEARCH)
  const sortFilter = useSelector((state) => state.SORT)
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
  useEffect(() => {
    const afterSearch = productList.filter((product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase())
    )
    const afterSort = sortingLogic(afterSearch)
    setFilter(afterSort)
  }, [searchFilter, sortFilter])

  return (
    <>
      <FilterBar />
      <AppBar user={user} setUser={setUser} />
      <ProductListing productList={filteredProducts} />
    </>
  )
}

export default Home
