const { trimStr } = require('./utils')

let users = []

const getUser = (user) => {
  // const userName = trimStr(user.name)
  // const userRoom = trimStr(user.room)

  // console.log('getUser')
  console.log(users)
  // console.log(userName)
  // console.log(userRoom)
  // console.log('//getUser')
  return users.find(
    (u) =>
      trimStr(u.name) === trimStr(user.name) &&
      trimStr(u.room) === trimStr(user.room)
  )
}

const addUser = (user) => {
  const isExist = getUser(user)
  // console.log('addUser')
  // console.log(isExist)
  // console.log(users)
  // console.log('//addUser')

  !isExist && users.push(user)

  const currentUser = isExist || user

  // console.log('addUser')
  // console.log(isExist)
  // console.log(users)
  // console.log(currentUser)
  // console.log('//addUser')

  return { isExist: !!isExist, user: currentUser }
}

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === trimStr(room)).length
}

const deleteUser = (user) => {
  console.log('--------------------')
  console.log('delete')
  console.log(users)
  console.log(user)
  users = users.filter((u) => u.name !== trimStr(user.name))
  console.log(users)
  console.log('--------------------')
}

module.exports = { addUser, getUser, getRoomUsers, deleteUser }
