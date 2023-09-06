import './style.css'
import { useState } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  priceRange,
  reset,
  setBrand,
  sortBy,
  setCategory,
} from '../reducers/filterReducer'

export default function MyDrawer({ show }) {
  const dispatch = useDispatch()
  const sortFilter = useSelector((state) => state.SORT)
  const brandFilter = useSelector((state) => state.BRAND)
  const categoryFilter = useSelector((state) => state.CATEGORY)
  const priceFilter = useSelector((state) => state.PRICE)

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
  const [state, setState] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState(open)
  }
  const width = 120

  const list = () => (
    <Box
      sx={{ width: 160 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="filtersindrawer">
        Filters
        <FormControl size="small" sx={{ width: width }}>
          <InputLabel>Sort By</InputLabel>
          <Select label="Sort by" value={sortFilter} onChange={handleSort}>
            <MenuItem value="DATE">New</MenuItem>
            <MenuItem value="PRICE_ASC">Price Low to High</MenuItem>
            <MenuItem value="PRICE_DESC">Price High to Low</MenuItem>
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
            <MenuItem value="U20K">Under 20K</MenuItem>
            <MenuItem value="20K50K">20K - 50K</MenuItem>
            <MenuItem value="50K80K">50K - 80K</MenuItem>
            <MenuItem value="O80K">Over 80K</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="error" onClick={handleReset}>
          Clear
        </Button>
      </div>
    </Box>
  )

  return (
    <>
      {show ? (
        <div className="drawer">
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <SwipeableDrawer
            anchor={'left'}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
        </div>
      ) : null}
    </>
  )
}
