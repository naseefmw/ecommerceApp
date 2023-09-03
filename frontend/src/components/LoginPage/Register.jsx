import '../style.css'
import { TextField, InputAdornment, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import registerService from '../../services/register'

const Register = () => {
  const navigate = useNavigate()
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
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="loginformbackground">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <TextField variant="outlined" label="Name" name="name" />

        <TextField
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
          multiline
          variant="outlined"
          label="Address"
          name="address"
          maxRows={3}
        />

        <TextField variant="outlined" label="Email" name="email" />

        <TextField variant="outlined" label="Username" name="username" />

        <TextField
          variant="outlined"
          type="password"
          label="Password"
          name="password"
        />
        <Button type="submit">Sign up</Button>
        <span>
          Already have an account?
          <Button variant="plain" size="sm" onClick={() => navigate('/login')}>
            Sign in
          </Button>
        </span>
      </form>
    </div>
  )
}

export default Register
