import { TextField, Button } from '@mui/material'
import loginService from '../../services/login'
import cartService from '../../services/cart'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
  const navigate = useNavigate()

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
      console.log(exception)
    }
  }

  return (
    <div className="loginformbackground">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <TextField variant="outlined" label="Username" name="username" />
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          name="password"
        />
        <Button type="submit">Sign in</Button>
        <span>
          Don&apos;t have account?
          <Button
            variant="plain"
            size="sm"
            onClick={() => navigate('/register')}
          >
            Sign up
          </Button>
        </span>
      </form>
    </div>
  )
}

export default Login
