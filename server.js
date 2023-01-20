const http = require('http');
const debug = require('debug')('node-angular');
const PORT = process.env.PORT || 3000;
const app = require('./backend/app.js');

const normalizePort = val => {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;

    if (port >= 0) return port;

    return false;
};

const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof addr === 'string' ? 'pipe ' + addr: 'port ' + port;
    switch (error.code) {
        case 'EACCESS':
            console.error(`${bind} requires elevated priviledges`);
            process.exit(1);
        break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        break;
        default:
            throw error;
    }
}

const onListenning = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr: 'port ' + port;
    debug(`Listenning on ${bind}`);
}

const port = normalizePort(PORT);
app.set('port', PORT);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListenning);

server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});