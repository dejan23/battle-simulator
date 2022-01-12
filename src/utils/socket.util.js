/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
const { Server } = require('socket.io');
const config = require('../../config/index.js');

let io;

const socketConnection = (server) => {
	io = new Server(server, {
		cors: {
			origin: config.socket.origin,
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		console.log(`Client connected: ${socket.id}`);

		socket.on('disconnect', () => {
			console.info(`Client disconnected [id=${socket.id}]`);
		});
	});
};

const sendMessage = (event, message) => io.emit(event, message);

module.exports = { socketConnection, sendMessage };
