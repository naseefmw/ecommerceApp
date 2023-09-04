import { Button, FormLabel, TextField } from '@mui/material'
import AppBar from '../AppBar'
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Checkout = ({ user, setUser }) => {
  const [method, setMethod] = useState('cod')
  const [open, setOpen] = useState(false)

  const handleRadio = (event) => {
    setMethod(event.target.value)
  }

  const handleButton = () => {
    setOpen(!open)
  }
  return (
    <>
      <AppBar user={user} setUser={setUser} />
      <div className="checkout">
        <span>Enter Delivery address:</span>

        <TextField
          multiline
          label="Address"
          maxRows={5}
          sx={{ width: '30%', minWidth: 400 }}
        />

        <FormControl>
          <FormLabel>Payment Method</FormLabel>
          <RadioGroup row onChange={handleRadio} value={method}>
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Cash on delivery"
            />
            <FormControlLabel
              control={<Radio />}
              value="card"
              label="Credi/Debit Card"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ width: 300 }}
          onClick={handleButton}
        >
          {method === 'cod' ? (
            <span>Place Order</span>
          ) : (
            <span>Proceed to Payment portal</span>
          )}
        </Button>
      </div>
      <Dialog open={open} onClose={handleButton}>
        <DialogTitle>{'Oops! This service is not yet available'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apologize for the inconvenience, this service is not active. Have a
            nice day :)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleButton}>Okay</Button>
          <Button onClick={handleButton} autoFocus>
            Not Okay :(
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Checkout
