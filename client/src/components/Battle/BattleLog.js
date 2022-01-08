/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRequest } from '../../utils/axios.util';

function BattleLog() {
	const [log, setLog] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id } = useParams();

	const fetchLog = () => {
		setLoading(true);
		setError(null);

		getRequest(`/battle/log?id=${id}`).then((res) => {
			if (res.response) {
				setLoading(false);
				setError(res.response.data.message);
				return;
			}
			setLog(res.data.battleLog);
			setLoading(false);
		});
	};

	const renderLog = (log) => {
		return (
			<div>
				{log.map((el, i) => {
					if (el.winner) {
						return <div key={el.id}>{el.winner}</div>;
					}
					return (
						<div key={el.id}>
							{i + 1}. {el.attackingArmyName} with {el.attackingArmyUnits} units
							attacked {el.defendingArmyName} with {el.defendingArmyUnits} -{' '}
							{el.attackSuccess ? 'Attack was successful' : 'Attack failed'}
						</div>
					);
				})}
			</div>
		);
	};

	const renderLoading = () => {
		if (loading) {
			return <div className="text-center p-2">Log is loading...</div>;
		}
	};

	useEffect(() => {
		fetchLog();
	}, []);

	return (
		<div className="flex flex-col">
			<div className="text-center text-2xl mb-5">
				<Link to={`/battle/${id}`}>Go back</Link>
			</div>
			<div className="text-xl text-center m-5">Battle Log for Battle ID {id}</div>
			{renderLoading()}
			{error && <div className="text-center">{error}</div>}
			{log && renderLog(log)}
		</div>
	);
}

export default BattleLog;
