import { Formik, Field, Form } from 'formik';
import { postRequest } from '../../utils/axios.util';
import { useParams } from 'react-router';

function BattleAddArmy({ fetchBattle }) {
	const { id } = useParams();

	const addArmyToTheBattle = (values) => {
		postRequest(`/army/create`, { ...values, battleId: id }).then((res) => {
			fetchBattle();
		});
	};

	return (
		<div>
			<Formik
				initialValues={{
					name: '',
					units: '',
					strategy: '',
				}}
				onSubmit={async (values) => {
					addArmyToTheBattle(values);
				}}
			>
				<Form className="flex flex-col">
					<div className="flex flex-col mt-2 mb-2">
						<label htmlFor="name">Army Name</label>
						<Field id="name" name="name" placeholder="army1" />
					</div>

					<div className="flex flex-col mt-2 mb-2">
						<label htmlFor="units">Units</label>
						<Field id="units" name="units" placeholder="80-100" />
					</div>

					<div className="mt-2 mb-2" role="group" aria-labelledby="my-radio-group">
						<div>Strategy</div>
						<div>
							<label className="m-1">
								<Field type="radio" name="strategy" value="random" />
								Random
							</label>
							<label className="m-1">
								<Field type="radio" name="strategy" value="strongest" />
								Strongest
							</label>
							<label className="m-1">
								<Field type="radio" name="strategy" value="weakest" />
								Weakest
							</label>
						</div>
					</div>

					<button
						className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Add new army
					</button>
				</Form>
			</Formik>
		</div>
	);
}

export default BattleAddArmy;
