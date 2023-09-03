import '../style.css'
import { TextField, InputAdornment, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import registerService from '../../services/register'

const Register = () => {
  const navigate = useNavigate()
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
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className="loginformbackground">
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
        />

        <TextField
          sx={{ width: width }}
          size="small"
          required
          variant="outlined"
          label="Phone"
          name="phone"
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
          required
        />

        <TextField
          sx={{ width: width }}
          size="small"
          variant="outlined"
          label="Username"
          name="username"
          required
        />

        <TextField
          sx={{ width: width }}
          size="small"
          required
          variant="outlined"
          type="password"
          label="Password"
          name="password"
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
