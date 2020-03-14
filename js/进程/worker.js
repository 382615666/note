// console.log('Worker-' + process.pid + ': Hello world.')

// 通讯
// process.on('message', msg => {
//     console.log(`child:${msg}`)
//     process.send(msg)
// })

// 轮询分发请求
// process.on('message', (msg, socket) => {
//     setTimeout(() => {
//         socket.end(`child id: ${process.pid}`)
//     }, 100)
// })


// 抢占处理
// process.on('message', (msg, server) => {
//     server.on('connection', socket => {
//         setTimeout(() => {
//             socket.end(`handler by ${process.pid}`)
//         }, 100)
//     })
// })

// http
const http = require('http')
const httpServer = http.createServer((req, res) => {
    setTimeout(() => {
        res.writeHead(200, {
            'content-type': 'text/plain'
        })
        res.end(`handler by worker${process.pid}`)
    }, 100)
})

process.on('message', (msg, server) => {
    server.on('connection', socket => {
        httpServer.emit('connection', socket)
    })
})