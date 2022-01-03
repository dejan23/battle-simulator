import { postRequest } from '../../utils/axios.util';
import { Link } from 'react-router-dom';

function BattleList({ list, getBattleList, selectBattles }) {
	const deleteBattle = (id) => {
		postRequest('/battle/delete', { id }).then((res) => getBattleList());
	};

	return (
		<div>
			{list
				? list.map((el) => {
						return (
							<div
								className="hover:cursor-default hover:bg-slate-200 p-1 flex justify-between text-left"
								key={el.id}
							>
								<div
									onClick={() => {
										if (el.status === 'ready') {
											return selectBattles(el.id);
										}
									}}
								>
									<div>Battle ID: {el.id}</div>
									<div>Status: {el.status}</div>
									{el.winner ? <div>Battle winner: {el.winner}</div> : ''}
								</div>
								<div>
									<div>
										<Link to={`/battle/${el.id}`}>View</Link>
									</div>
									<div
										className="opacity-30 hover:cursor-pointer"
										onClick={() => deleteBattle(el.id)}
									>
										Delete
									</div>
								</div>
							</div>
						);
				  })
				: 'No battles'}
		</div>
	);
}

export default BattleList;
