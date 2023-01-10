const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
  // res.send('Http server is working')
  res.sendFile(path.join(__dirname, '/index.html'))
})

module.exports = router
