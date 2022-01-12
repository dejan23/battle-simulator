const express = require('express');
const cors = require('cors');
const http = require('http');

const errorHandler = require('./middlewares/errorHandler.middleware.js');
const routes = require('./routes/index.js');
const { socketConnection } = require('./utils/socket.util.js');
const config = require('../config/index.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use(errorHandler);

// Websocket server
const server = http.createServer(app);

socketConnection(server);

server.listen(config.socket.port, () => {
	console.log(`Websocket server listening on port http://localhost:${config.socket.port}`);
});

module.exports = app;
