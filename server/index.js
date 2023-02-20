const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const route = require('./route')
const { addUser, getUser, getRoomUsers, deleteUser } = require('./users')

const app = express()
app.use(cors({ origin: '*' }))
app.use(route)
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }) => {
    socket.join(room)

    const { user, isExist } = addUser({ name: name, room: room })

    const userMessage = isExist
      ? `${user.name}, here you go again`
      : `Hello ${user.name}`

    socket.emit('message', {
      data: {
        id: Date.now(),
        user: { name: 'Admin' },
        message: userMessage,
        countUsersRoom: getRoomUsers(user.room),
      },
    })

    socket.broadcast.to(user.room).emit('message', {
      data: {
        id: Date.now(),
        user: { name: 'Admin' },
        message: `${user.name} has join`,
        countUsersRoom: getRoomUsers(user.room),
      },
    })
  })

  socket.on('sendMessage', ({ message, params }) => {
    const user = getUser(params)
    if (user) {
      io.to(user.room).emit('message', {
        data: {
          id: Date.now(),
          user,
          message,
          countUsersRoom: getRoomUsers(user.room),
        },
      })
    }
  })

  socket.on('leftRoom', ({ params }) => {
    const user = getUser(params)

    if (user) {
      deleteUser(params)
      io.to(user.room).emit('message', {
        data: {
          id: Date.now(),
          user: { name: 'Admin' },
          message: `${user.name} has logout`,
          countUsersRoom: getRoomUsers(user.room),
        },
      })
    }
  })

  io.on('disconnect', () => {
    console.log('disconnect')
  })
})

server.listen(5555, () => {
  console.log('Server is running')
})
