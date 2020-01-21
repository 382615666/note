const express = require('express')

const app = express()

app.use(express.static(__dirname + '/'))

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(8888, () => {
  console.log(8888)
})
