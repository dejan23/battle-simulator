/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
const config = require('../config');
let io;

exports.socketConnection = (server) => {
	io = require('socket.io')(server, {
		cors: {
			origin: config.socket.port,
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

exports.sendMessage = (event, message) => io.emit(event, message);
