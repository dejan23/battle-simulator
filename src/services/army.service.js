const db = require('../models/index.js');
const { HttpNotFound, HttpError, HttpInternalServerError } = require('../utils/errors.util.js');

const Army = db.armies;
const Battle = db.battles;

const handleArmyCreate = async (body) => {
	try {
		const battle = await Battle.findByPk(body.battleId, {
			include: 'armies',
			plain: true,
		});

		if (!battle) {
			throw new HttpNotFound('Battle with that id does not exist');
		}

		// should be n
		if (battle.armies.length >= 500) {
			throw new HttpError('Battle have maximum number of armies');
		}

		const army = await Army.create({ ...body, initUnits: body.units });

		if (battle.armies.length <= 1) {
			await Battle.update({ status: 'ready' }, { where: { id: body.battleId } });
		}

		return army;
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

const handleArmyDelete = async (body) => {
	try {
		await Army.destroy({ where: { id: body.armyId } });

		const battle = await Battle.findByPk(body.battleId, {
			include: 'armies',
		});

		if (!battle) {
			throw new HttpError('Battle with that id does not exist');
		}

		if (battle.armies.length < 2) {
			await Battle.update(
				{ status: 'waiting for armies' },
				{
					where: { id: body.battleId },
				}
			);
		}

		return { message: 'Army deleted' };
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

module.exports = { handleArmyCreate, handleArmyDelete };
