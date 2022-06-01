// https://gist.github.com/timoxley/1689041
// https://nodejs.org/dist/latest-v12.x/docs/api/net.html#net_net_createserver_options_connectionlistener
const {createServer} = require('net')

const isPortTaken = (port) => new Promise((resolve, reject) => {
    const tester = createServer()
        .once('error', err => (err.code == 'EADDRINUSE' ? resolve(true) : reject(err)))
        .once('listening', () => tester.once('close', () => resolve(false)).close())
        .listen(port)
});
