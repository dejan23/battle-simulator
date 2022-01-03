const db = require('../models');

const Army = db.armies;
const Battle = db.battles;

// Create a new Army
exports.create = async (req, res) => {
	const battle = await Battle.findByPk(req.body.battleId, {
		include: 'armies',
		plain: true,
	});

	if (!battle) {
		return res
			.status(400)
			.send({ error: true, msg: 'Battle with that id does not exist' });
	}

	// should be n
	if (battle.armies.length >= 500) {
		return res.send({ error: true, msg: 'Battle have maximum number of armies' });
	}

	try {
		const army = await Army.create(req.body);
		if (battle.armies.length <= 1) {
			await Battle.update(
				{ status: 'ready' },
				{ where: { id: req.body.battleId } }
			);
		}

		return res.send(army);
	} catch (error) {
		return res.status(400).send({ error });
	}
};

exports.delete = async (req, res) => {
	await Army.destroy({ where: { id: req.body.armyId } });

	const battle = await Battle.findByPk(req.body.battleId, {
		include: 'armies',
	});

	if (!battle) {
		return res.send({ error: true, msg: 'Battle with that id does not exist' });
	}

	console.log(battle);

	// should be n
	if (battle.armies.length < 2) {
		console.log('here');
		await Battle.update(
			{ status: 'waiting for armies' },
			{
				where: { id: req.body.battleId },
			}
		);
	}

	return res.send('Army deleted');
};
