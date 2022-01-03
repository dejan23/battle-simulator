const config = require('./config');
const express = require('express');
const cors = require('cors');
const http = require('http');

const Seed = require('./utils/seed.util');
const errorHandler = require('./middlewares/errorHandler.middleware');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('hello'));
app.get('/api/seed', Seed.generate);

routes(app);

app.use(errorHandler);

module.exports = {
	app,
};

const { socketConnection } = require('./utils/socket.util');

const server = http.createServer(app);
socketConnection(server);

server.listen(config.socket.port, () => {
	console.log(
		`Websocket server listening on port http://localhost:${config.socket.port}`
	);
});
