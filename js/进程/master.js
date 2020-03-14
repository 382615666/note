const child = require('child_process')
const os = require('os')
const net = require('net')

const cpuNum = os.cpus().length

// for (let i = 0; i < cpuNum; i++) {
//     child.fork('./worker.js')
// }
// console.log('master')


// 通讯
// const worker = child.fork('./worker.js')
// worker.send('hi')
// worker.on('message', msg => {
//     console.log(`master:${msg}`)
// })


// 轮询分发请求
// const workers = []
// for (let i = 0; i < cpuNum; i++) {
//     workers.push(child.fork('./worker.js'))
//     console.log(`create child: ${workers[i].pid}`)
// }

// let cur = 0
// const server = net.createServer()
// server.on('connection', (socket) => {
//     workers[cur].send('socket', socket)
//     cur = Number.parseInt((cur + 1) % cpuNum)
// })

// server.listen(8088, () => {
//     console.log('listen on 8088')
// })

// 抢占分发
// const workers = []
// for (let i = 0; i < cpuNum; i++) {
//     workers.push(child.fork('./worker.js'))
//     console.log(`child id: ${workers[i].pid}`)
// }

// const server = net.createServer()
// server.listen(8088, () => {
//     for (let i = 0; i < cpuNum; i++) {
//         workers[i].send('server', server)
//     }
//     server.close()
// })

// 进程重启
// const workers = []
// for (let i = 0; i < cpuNum; i++) {
//     workers.push(child.fork('./worker.js'))
//     console.log(`child id: ${workers[i].pid}`)
// }

// const server = net.createServer()

// server.on('connection', socket => {
//     socket.end(`master handler by ${process.pid}`)
// })
// console.log(`master pid ${process.pid}`)

// server.listen(8088, () => {
//     for (let i = 0; i < cpuNum; i++) {
//         workers[i].send('server', server)
//         workers[i].on('exit', () => {
//             workers[i] = child.fork('./worker.js')
//             workers[i].send('server', server)
//             console.log(`restart child${i} ${workers[i].pid}`)
//         })
//     }
// })

// http
const workers = []
for (let i = 0; i < cpuNum; i++) {
    workers.push(child.fork('./worker.js'))
    console.log(`child id: ${workers[i].pid}`)
}

const server = net.createServer()
server.listen(8088, () => {
    for (let i = 0; i < cpuNum; i++) {
        workers[i].send('server', server)
    }
    server.close()
})
