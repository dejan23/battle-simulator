const express = require('express');
const cors = require('cors');
const http = require('http');
const Queue = require('bull');

const Seed = require('./utils/seed.util');

const app = express();

const battleQueue = new Queue('battle queue', 'redis://127.0.0.1:6379');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ message: 'hello world' });
});

app.get('/api/seed', Seed.generate);

require('./routes/battle.routes')(app);
require('./routes/army.routes')(app);

module.exports = {
	app,
	battleQueue,
};

const { socketConnection } = require('./utils/socket.util');

const server = http.createServer(app);
socketConnection(server);

const port = 5001;

server.listen(port, () => console.log(`Listening on port ${port}`));
