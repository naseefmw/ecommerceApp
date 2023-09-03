import '../style.css'
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { searchFor, sortBy } from '../../reducers/filterReducer'

const FilterBar = () => {
  const dispatch = useDispatch()
  const searchFilter = useSelector((state) => state.SEARCH)
  const sortFilter = useSelector((state) => state.SORT)
  const handleSearch = (event) => {
    dispatch(searchFor(event.target.value))
  }
  const handleSort = (event) => {
    dispatch(sortBy(event.target.value))
  }
  return (
    <div className="filternavbar">
      <TextField
        label="Search"
        defaultValue={searchFilter}
        onChange={handleSearch}
      ></TextField>
      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select label="Sort by" value={sortFilter} onChange={handleSort}>
          <MenuItem value="DATE">New</MenuItem>
          <MenuItem value="PRICE_ASC">Price low to high</MenuItem>
          <MenuItem value="PRICE_DESC">Price high to low</MenuItem>
          <MenuItem value="RATING">Rating</MenuItem>
        </Select>
      </FormControl>
      Brand
      <Select label="Brand">
        <MenuItem>Samsung</MenuItem>
        <MenuItem>HP</MenuItem>
        <MenuItem>Apple</MenuItem>
      </Select>
      Price Range
      <Select label="Price">
        <MenuItem>0 - 10000</MenuItem>
        <MenuItem>100001 - 200000</MenuItem>
      </Select>
    </div>
  )
}

export default FilterBar
