const os = require('os')
const cluster = require('cluster')

const cpuNum = os.cpus().length

if (cluster.isMaster) {
    for (let i = 0; i < cpuNum; i++) {
        cluster.fork()
    }
    cluster.on('online', worker => {
        console.log(`create worker pid: ${worker.process.pid}`)
    })
    cluster.on('exit', (worker, code, signal) => {
        console.log('[Master] worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
        cluster.fork()
    })
} else {
    const net = require('net')
    net.createServer().on('connection', (socket) => {
      // 利用setTimeout模拟处理请求时的操作耗时
      setTimeout(() => {
        socket.end('Request handled by worker-' + process.pid)
      }, 10)
    }).listen(8080)
}
