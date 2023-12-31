import '../style.css'
import { TextField, InputAdornment, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import registerService from '../../services/register'
import { useState } from 'react'
import Snackbar from '../Snackbar'

const Register = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')
  const width = 250
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await registerService.register({
        username: event.target.username.value,
        name: event.target.name.value,
        password: event.target.password.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        avatarId: 1,
        address: event.target.address.value,
      })
      setMessage('Account successfully created')
      setType('success')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      setOpen(true)
    } catch (exception) {
      console.log(exception.response.data)
      setMessage('Failed: Username or email already exists')
      setType('error')
      setOpen(true)
    }
  }
  return (
    <div className="loginformbackground">
      <Snackbar open={open} setOpen={setOpen} type={type} message={message} />
      <form onSubmit={handleSubmit}>
        <span className="logo">Circuit Cart </span>
        <h2>Sign up</h2>
        <span className="lighttext">Please enter your details</span>
        <TextField
          sx={{ width: width }}
          variant="outlined"
          label="Name"
          name="name"
          required
          size="small"
          inputProps={{ minLength: 3 }}
        />

        <TextField
          sx={{ width: width }}
          size="small"
          required
          variant="outlined"
          label="Phone"
          name="phone"
          type="number"
          inputProps={{ min: 1000000000, max: 9999999999 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
        />

        <TextField
          sx={{ width: width }}
          size="small"
          multiline
          variant="outlined"
          label="Address"
          name="address"
          maxRows={3}
        />

        <TextField
          sx={{ width: width }}
          size="small"
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          required
        />

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
          Sign up
        </Button>
        <span>
          Already have an account?
          <Button variant="text" onClick={() => navigate('/login')}>
            Sign in
          </Button>
        </span>
      </form>
    </div>
  )
}

export default Register
