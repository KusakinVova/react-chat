const { trimStr } = require('./utils')

let users = []

const getUser = (user) => {
  return users.find(
    (u) =>
      trimStr(u.name) === trimStr(user.name) &&
      trimStr(u.room) === trimStr(user.room)
  )
}

const addUser = (user) => {
  const isExist = getUser(user)
  !isExist && users.push(user)
  const currentUser = isExist || user

  return { isExist: !!isExist, user: currentUser }
}

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === trimStr(room)).length
}

const deleteUser = (user) => {
  users = users.filter((u) => u.name !== trimStr(user.name))
}

module.exports = { addUser, getUser, getRoomUsers, deleteUser }
