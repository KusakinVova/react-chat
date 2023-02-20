import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { useState } from 'react'
import { TextField, Button } from '@mui/material/'
import './style.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiPicker from 'emoji-picker-react'
import Message from './Message'

const socket = io.connect('http://localhost:5555/')

const Chat = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  // console.log('search')
  // console.log(search)
  const [params, setParams] = useState({ name: '', room: '' })
  const [messages, setMessages] = useState([])
  const [myMessage, setMyMessage] = useState('')
  const [usersInRoom, setUsersInRoom] = useState(0)

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setParams(searchParams)
    // console.log(searchParams)
    socket.emit('join', searchParams)
    /* 
      socket.on('message', ({ data }) => {
        console.log(data)
      })
     */
  }, [search])

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMessages((_messages) => [..._messages, data])
      setUsersInRoom(data.countUsersRoom)
      // console.log(data)
    })
  }, [])

  useEffect(() => {
    const chat__body = document.querySelector('.chat__body')
    chat__body.scrollTo(0, chat__body.scrollHeight)
  }, [messages])

  // console.log(messages)

  const [stateDialog, setStateDialog] = useState(false)

  const handleLogOut = () => {
    socket.emit('leftRoom', { params })
    navigate('/')
  }

  const handleEmojiClick = ({ emoji }) => {
    setMyMessage(`${myMessage} ${emoji}`)
    setStateDialog((state) => !state)
  }
  const handleSendMessage = () => {
    if (myMessage === '') return false
    socket.emit('sendMessage', { message: myMessage, params }) // отправляем сообщение на сервер
    setMyMessage('')
  }
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSendMessage()
  //     setMyMessage('')
  //   }
  // }

  return (
    <div className="chat">
      <div className="chat__header">
        <p className="chat__title">
          Chat room - {params.room} ({usersInRoom} - users)
        </p>

        <p className="chat__title">
          Your name - {params.name}{' '}
          <Button variant="contained" onClick={handleLogOut}>
            Log out
          </Button>
        </p>
      </div>
      <div className="chat__body">
        {messages.length !== 0 &&
          messages.map((data, i) => (
            <Message key={data.id + i} data={data} user={params.name} />
          ))}
      </div>
      <div className="chat__footer">
        <TextField
          className="field__message"
          id="outlined-basic"
          label="Your message"
          variant="outlined"
          autoComplete="off"
          name="newmessage"
          value={myMessage}
          onChange={(e) => setMyMessage(e.target.value)}
          multiline
          rows={2}
          // onKeyDown={handleKeyDown}
        />
        <EmojiEmotionsIcon
          sx={{
            color: '#fff',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
          }}
          onClick={() => setStateDialog((state) => !state)}
        />
        <div className={stateDialog ? 'dialog open' : 'dialog'}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
        <Button variant="contained" onClick={handleSendMessage}>
          Send message
        </Button>
      </div>
    </div>
  )
}

export default Chat
