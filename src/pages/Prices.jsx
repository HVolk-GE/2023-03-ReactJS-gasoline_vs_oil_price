import React from "react";
// In dieser Reihenfolge in das return einfügen !
import GasPrice from "../components/gasprices/GasBrentPrices";
import OilPrice from "../components/oilprices/OilBrentPrices";
import GasolinePrices from "../components/tankgasprices/TankPrices";

function Prices() {
	return (
		<div className="Prices">
			<GasPrice />
			<OilPrice />
			<div>
				<a href="https://finance.yahoo.com" target="_blank" rel="noreferrer">
					Daten-Quelle: https://finance.yahoo.com
				</a>
			</div>
			<GasolinePrices />
			<div>
				<a href="https://tankerkoenig.de" target="_blank" rel="noreferrer">
					Daten-Quelle: tankerkoenig.de
				</a>
			</div>
		</div>
	);
}
export default Prices;
