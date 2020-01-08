const cluster = require('cluster')
const os = require('os')
const pid = process.pid

if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  for(let i = 0; i < cpuCount - 1; i++) {
    const worker = cluster.fork();
    worker.on('exit', () => {
      cluster.fork();
    })
  }
}

if (cluster.isWorker) {
  require('./worker')
}
