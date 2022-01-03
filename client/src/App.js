import { Routes, Route } from 'react-router-dom';
import Battle from './components/Battle';
import BattleSingle from './components/Battle/BattleSingle';

function App() {
	return (
		<div className="bg-sky-50 h-screen overflow-y-scroll p-10">
			<main className="flex justify-center items-center">
				<Routes>
					<Route path="/" element={<Battle />} />
					<Route path="/battle/:id" element={<BattleSingle />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
