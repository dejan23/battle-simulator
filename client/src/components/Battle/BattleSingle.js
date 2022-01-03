/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { getRequest, postRequest } from '../../utils/axios.util';
import BattleAddArmy from './BattleAddArmy';

function BattleSingle() {
	const [battle, setBattle] = useState(null);
	const { id } = useParams();

	const fetchBattle = () => {
		getRequest(`/battle/single?id=${id}`).then((res) => {
			console.log(res);
			setBattle(res.data.battle);
		});
	};

	const deleteArmy = (armyId, battleId) => {
		postRequest('/army/delete', { armyId, battleId }).then(() => fetchBattle());
	};

	useEffect(() => {
		fetchBattle();
	}, []);

	const renderBattle = (data) => {
		const armies = () => {
			if (!data.armies.length) return 'No armies added';

			return data.armies.map((el) => {
				console.log('here', el);
				return (
					<div
						className="flex items-center justify-between hover:bg-slate-200 border-b mb-2"
						key={el.id}
					>
						<div>
							<div>Army Name: {el.name}</div>
							<div>Units: {el.units}</div>
							<div>Strategy: {el.strategy}</div>
							<div>Created at: {dayjs(el.createdAt).format('DD-MM-YYYY')}</div>
						</div>
						<div
							className="hover:cursor-pointer"
							onClick={() => deleteArmy(el.id, el.battleId)}
						>
							Remove
						</div>
					</div>
				);
			});
		};

		return (
			<div>
				<div>Battle id: {data.id}</div>
				<div>Status: {data.status}</div>
				<div>Created at: {dayjs(data.createdAt).format('DD-MM-YYYY')}</div>
				<BattleAddArmy fetchBattle={fetchBattle} />
				{armies()}
			</div>
		);
	};

	return (
		<div>
			<div className="text-center text-2xl mb-5">
				<Link to="/">Go back to homepage</Link>
			</div>
			<div>{battle && renderBattle(battle)}</div>
		</div>
	);
}

export default BattleSingle;
