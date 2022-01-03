/* eslint-disable no-await-in-loop */
const db = require('../models');
const { sendMessage } = require('./socket.util');

const Battle = db.battles;
const Army = db.armies;

function percantage(value, outOff) {
	return (value * 100) / outOff;
}

function randomNumGenerator(min = 80, max = 100) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const strategy = ['random', 'strongest', 'weakest'];

exports.generate = async (req, res) => {
	const count = 20;
	await db.sequelize.sync({ force: true });

	for (let i = 1; i <= count; i += 1) {
		const battle = await Battle.create();

		for (let j = 1; j <= 5; j += 1) {
			const units = randomNumGenerator();

			await Army.create({
				name: `Army ${j}`,
				units: units,
				initUnits: units,
				strategy: strategy[randomNumGenerator(0, 2)],
				battleId: battle.id,
			});

			await Battle.update({ status: 'ready' }, { where: { id: battle.id } });
		}

		sendMessage('reload', percantage(i, count));
	}

	return res.send({ msg: `Created ${count} battles` });
};
