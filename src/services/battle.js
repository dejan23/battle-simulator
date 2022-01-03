/* eslint-disable no-await-in-loop */

const db = require('../models');

const Army = db.armies;
const Battle = db.battles;

function getSelectedArmy(armies, attackerId, strategy) {
	const availableArmies = armies.filter(
		(army) => army.id !== attackerId && army.units > 0
	);

	if (!availableArmies.length) {
		return null;
	}

	if (availableArmies.length === 1) {
		return availableArmies[0];
	}

	let army;

	if (strategy === 'random') {
		const randomIndex = Math.floor(Math.random() * availableArmies.length);
		army = availableArmies[randomIndex];
	} else if (strategy === 'strongest') {
		let strongest = availableArmies[0];
		for (let i = 1; i < availableArmies.length; i += 1) {
			if (strongest.units < availableArmies[i].units) {
				strongest = availableArmies[i];
			}
		}
		army = strongest;
	} else if (strategy === 'weakest') {
		let weakest = availableArmies[0];
		for (let i = 1; i < availableArmies.length; i += 1) {
			if (weakest.units > availableArmies[i].units) {
				weakest = availableArmies[i];
			}
		}
		army = weakest;
	}

	return army;
}

function randomNumGenerator(min = 1, max = 100) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function attackChances(units) {
	const randomNum = randomNumGenerator();

	if (units < 10) {
		if (randomNum < 10) {
			return true;
		}
		return false;
	}

	if (randomNum < units) {
		return true;
	}
	return false;
}

function chooseAttackingArmy(armies) {
	return Math.floor(Math.random() * armies.length);
}

module.exports = async function startBattle(job) {
	const { armies } = job.data;
	let winner = false;

	while (winner === false) {
		for (let i = 0; i < armies.length; i += 1) {
			const battle = await Battle.findOne({
				where: { id: armies[i].battleId },
			});

			if (battle.status === 'paused') break;

			const randomAttackingArmyIndex = chooseAttackingArmy(armies);
			const attackingArmy = armies[randomAttackingArmyIndex];

			if (attackingArmy.units > 0) {
				const defendingArmy = getSelectedArmy(
					armies,
					attackingArmy.id,
					attackingArmy.strategy
				);

				const attackSuccess = attackChances(attackingArmy.units);

				if (attackSuccess) {
					if (defendingArmy === null) {
						winner = attackingArmy;
						break;
					}

					let damage = 0.5;

					if (defendingArmy.units <= 1) damage = 1;

					defendingArmy.units -= damage;

					await Army.update(
						{ units: defendingArmy.units },
						{ where: { id: defendingArmy.id } }
					);
					// console.log(armies);
				}
			}
		}
	}

	await Battle.update(
		{ status: 'finished', winner: winner.name },
		{ where: { id: armies[0].battleId } }
	);

	return Promise.resolve(winner);
};
