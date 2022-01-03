/* eslint-disable no-await-in-loop */
const db = require('../models');
const { sendMessage } = require('./socket.util');

const Battle = db.battles;
const Army = db.armies;

function percantage(value, outOff) {
	return (value * 100) / outOff;
}

exports.generate = async (req, res) => {
	const count = 20;
	await db.sequelize.sync({ force: true });

	for (let i = 1; i <= count; i += 1) {
		const battle = await Battle.create();

		for (let j = 1; j <= 5; j += 1) {
			await Army.create({
				name: `Army ${j}`,
				units: 80,
				strategy: 'random',
				battleId: battle.id,
			});

			await Battle.update({ status: 'ready' }, { where: { id: battle.id } });
		}

		sendMessage('reload', percantage(i, count));
	}

	return res.send({ msg: `Created ${count} battles` });
};
