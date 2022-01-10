/* eslint-disable no-await-in-loop */
import rimraf from 'rimraf';
import path from 'path';

import db from '../models';
import { sendMessage } from './socket.util';

const Battle = db.battles;
const Army = db.armies;

const percantage = (value, outOff) => (value * 100) / outOff;

const randomNumGenerator = (min = 80, max = 100) =>
	Math.floor(Math.random() * (max - min + 1) + min);

// TO:DO CONSTANTS
const strategy = ['random', 'strongest', 'weakest'];

const seed = async (req, res) => {
	const count = 20;
	await db.sequelize.sync({ force: true });

	//delete all logs
	rimraf.sync(path.join(__dirname, '../logs/battles/*'));

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

export default seed;
