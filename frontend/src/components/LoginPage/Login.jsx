import { TextField, Button } from '@mui/material'
import loginService from '../../services/login'
import cartService from '../../services/cart'
import { useNavigate } from 'react-router-dom'
import Snackbar from '../Snackbar'
import { useState } from 'react'

const Login = ({ setUser }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const width = 250
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      })
      window.localStorage.setItem('loggedBookTrackerUser', JSON.stringify(user))
      setUser(user)

      cartService.setToken(user.token)
      navigate(`/`)
    } catch (exception) {
      console.log(exception.response.data)
      setMessage('Invalid username or password ')
      setTimeout(() => {
        setMessage(null)
      }, 6000)
      setOpen(true)
    }
  }

  return (
    <div className="loginformbackground">
      <Snackbar
        open={open}
        setOpen={setOpen}
        type={'error'}
        message={message}
      />
      <form onSubmit={handleSubmit}>
        <span className="logo">Circuit Cart </span>
        <h2>Sign in</h2>
        <span className="lighttext">Welcome back!</span>
        <TextField
          sx={{ width: width }}
          size="small"
          variant="outlined"
          label="Username"
          name="username"
          required
          inputProps={{ minLength: 4 }}
        />
        <TextField
          sx={{ width: width }}
          size="small"
          required
          variant="outlined"
          type="password"
          label="Password"
          name="password"
          inputProps={{ minLength: 8 }}
        />
        <Button type="submit" variant="contained">
          Sign in
        </Button>
        <span>
          Don&apos;t have account?
          <Button variant="text" onClick={() => navigate('/register')}>
            Sign up
          </Button>
        </span>
      </form>
    </div>
  )
}

export default Login
