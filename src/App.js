import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Prices from "./pages/Prices";
import Overview from "./pages/PricesHistroy";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Prices />} />
					<Route path="/view" element={<Overview />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
