const db = require('../models');
const {
	startBattle,
	pauseBattle,
	resumeBattle,
} = require('../services/battle.service');

const Battle = db.battles;

// Create a new Battle
exports.create = async (req, res) => {
	const battle = await Battle.create();

	return res.send(battle);
};

exports.delete = async (req, res) => {
	await Battle.destroy({ where: { id: req.body.ids } });

	return res.send('battle deleted');
};

exports.getAll = async (req, res) => {
	const battles = await Battle.findAll({ include: ['armies'] });

	return res.json(battles);
};

exports.getSingle = async (req, res) => {
	const battle = await Battle.findByPk(req.query.id, {
		include: ['armies'],
	});

	return res.json({ battle });
};

exports.start = async (req, res) => {
	let { ids } = req.query;

	ids = ids.split(',');

	const startBattleRes = await startBattle(ids);
	console.log('HERE', ids);

	if (startBattleRes.error) {
		return res.send({ error: startBattleRes.error });
	}

	if (!startBattleRes) {
		return res.send({ error: 'There was a problem with processing battle' });
	}

	return res.send('game started');
};

exports.pause = async (req, res) => {
	await pauseBattle(req.query.id);

	return res.send();
};

exports.resume = async (req, res) => {
	await resumeBattle(req.query.id);

	return res.send();
};
