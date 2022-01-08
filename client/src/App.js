import { Routes, Route } from 'react-router-dom';
import Battle from './components/Battle';
import BattleLog from './components/Battle/BattleLog';
import BattleSingle from './components/Battle/BattleSingle';

function App() {
	return (
		<div className="bg-sky-50 h-screen overflow-y-scroll p-10">
			<main className="flex justify-center items-center">
				<Routes>
					<Route path="/" element={<Battle />} />
					<Route path="/battle/:id" element={<BattleSingle />} />
					<Route path="/battle/:id/log" element={<BattleLog />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
