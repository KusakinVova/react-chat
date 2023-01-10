import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box } from '@mui/material/'
import AccountCircle from '@mui/icons-material/AccountCircle'
import './style.css'

const FIELDS = {
  NAME: 'name',
  ROOM: 'room',
}

const Main = () => {
  const navigate = useNavigate()
  const { NAME, ROOM } = FIELDS
  const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' })

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v)
    if (!isDisabled) navigate(`/chat?name=${values[NAME]}&room=${values[ROOM]}`)
  }

  return (
    <div className="main">
      <h1>Welcome to Chatik</h1>
      <div className="main__form">
        <Box sx={{ display: 'flex', my: '20px', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: '#fff', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Your name"
            variant="standard"
            className="field__message"
            autoComplete="off"
            name="name"
            value={values[NAME]}
            onChange={(e) => handleChange(e)}
            required
          />
        </Box>
        <Box sx={{ display: 'flex', my: '20px', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: '#fff', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Chat room"
            variant="standard"
            className="field__message"
            autoComplete="off"
            name="room"
            value={values[ROOM]}
            onChange={(e) => handleChange(e)}
            required
          />
        </Box>
      </div>
      <Button sx={{ m: 1 }} variant="contained" onClick={handleClick}>
        Go to room
      </Button>
    </div>
  )
}

export default Main
