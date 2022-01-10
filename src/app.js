import express from 'express';
import cors from 'cors';
import http from 'http';

import * as config from './config/index.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import routes from './routes/index.js';
import { socketConnection } from './utils/socket.util.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use(errorHandler);

const server = http.createServer(app);
socketConnection(server);

server.listen(config.socket.port, () => {
	console.log(
		`Websocket server listening on port http://localhost:${config.socket.port}`
	);
});

export { app };
