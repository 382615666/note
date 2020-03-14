const net = require('net')
const maxConnectCount = 10

for (let i = 0; i < maxConnectCount; ++i) {
  net.createConnection({
    port: 8088,
    host: '127.0.0.1'
  }).on('data', (data) => {
    console.log(data.toString())
  }).on('error', err => {
      console.log(err)
  })
}