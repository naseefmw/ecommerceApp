import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset } from '../reducers/filterReducer'
import { Button } from '@mui/material'
import Drawer from './Drawer'

const MyAppBar = ({ user, setUser, show }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setAnchorEl(null)
    dispatch(reset())
    navigate('/')
  }
  const handleLogin = () => {
    setAnchorEl(null)
    navigate('/login')
  }

  const handleLogo = () => {
    dispatch(reset())
    navigate('/')
  }

  const handleCartButton = () => {
    dispatch(reset())
    if (user) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#E84855' }}>
        <Toolbar>
          <Drawer show={show} />
          <IconButton onClick={handleLogo}>
            <Typography variant="h6" noWrap component="div">
              <span className="logo">Circuit Cart</span>
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {user ? (
              <>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleCartButton}
                >
                  <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <Button variant="contained" onClick={handleLogin}>
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  )
}

export default MyAppBar
