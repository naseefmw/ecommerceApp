import '../style.css'
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  priceRange,
  reset,
  searchFor,
  setBrand,
  sortBy,
  setCategory,
} from '../../reducers/filterReducer'

const FilterBar = () => {
  const dispatch = useDispatch()
  const searchFilter = useSelector((state) => state.SEARCH)
  const sortFilter = useSelector((state) => state.SORT)
  const brandFilter = useSelector((state) => state.BRAND)
  const categoryFilter = useSelector((state) => state.CATEGORY)
  const priceFilter = useSelector((state) => state.PRICE)

  const handleSearch = (event) => {
    dispatch(searchFor(event.target.value))
  }
  const handleSort = (event) => {
    dispatch(sortBy(event.target.value))
  }
  const handleBrand = (event) => {
    dispatch(setBrand(event.target.value))
  }
  const handleCategory = (event) => {
    dispatch(setCategory(event.target.value))
  }
  const handlePrice = (event) => {
    dispatch(priceRange(event.target.value))
  }
  const handleReset = () => {
    dispatch(reset())
  }

  const width = 130
  return (
    <div className="filternavbar">
      <TextField
        size="small"
        label="Search"
        value={searchFilter}
        onChange={handleSearch}
      ></TextField>
      <FormControl size="small" sx={{ width: width }}>
        <InputLabel>Sort By</InputLabel>
        <Select label="Sort by" value={sortFilter} onChange={handleSort}>
          <MenuItem value="DATE">New</MenuItem>
          <MenuItem value="PRICE_ASC">Price low to high</MenuItem>
          <MenuItem value="PRICE_DESC">Price high to low</MenuItem>
          <MenuItem value="RATING">Rating</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: width }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={categoryFilter}
          onChange={handleCategory}
        >
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="Accessory">Accessory</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="SmartPhone">SmartPhone</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: width }}>
        <InputLabel>Brand</InputLabel>
        <Select label="Brand" value={brandFilter} onChange={handleBrand}>
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="Apple">Apple</MenuItem>
          <MenuItem value="Google">Google</MenuItem>
          <MenuItem value="HP">HP</MenuItem>
          <MenuItem value="Samsung">Samsung</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: width }}>
        <InputLabel>Price</InputLabel>
        <Select label="Price" value={priceFilter} onChange={handlePrice}>
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="U10K">Under 10K</MenuItem>
          <MenuItem value="10K20K">10K - 20K</MenuItem>
          <MenuItem value="20K50K">20K - 50K</MenuItem>
          <MenuItem value="O50K">Over 50K</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="error" onClick={handleReset}>
        Clear
      </Button>
    </div>
  )
}

export default FilterBar
