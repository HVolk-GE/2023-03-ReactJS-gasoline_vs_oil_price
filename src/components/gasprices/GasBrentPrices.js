import { useEffect, useState } from "react";
import axios from "axios";

// API Call for GAS - Brent price:
async function getStonks() {
	let apiResponse;
	await axios
		.get("http://localhost:8080/RB=F")
		.then((response) => {
			apiResponse = response.data;
		})
		.catch((error) => {
			apiResponse = error;
		});

	return apiResponse;
}

// Numbers round to correct decimal
const round = (number) => {
	return number ? +number.toFixed(2) : null;
};

// Read the response-data from the API and save inside redux:
function GasBrentPrices() {
	// eslint-disable-next-line no-unused-vars
	const [series, setSeries] = useState([
		{
			data: [],
		},
	]);
	const [price, setPrice] = useState(-1);
	const [prevPrice, setPrevPrice] = useState(-1);
	const [priceTime, setPriceTime] = useState(null);

	useEffect(() => {
		let timeoutId;
		async function getLatestPrice() {
			try {
				const data = await getStonks();
				const gme = data.quoteSummary.result[0];
				setPrice(gme.price.regularMarketPrice.raw.toFixed(2));
				setPrevPrice(gme.price.regularMarketPreviousClose.raw.toFixed(2));
				setPriceTime(new Date(gme.price.regularMarketTime * 50000));
				const quote = gme.indicators.quote[0];
				const prices = gme.timestamp.map((timestamp, index) => ({
					x: new Date(timestamp * 1000),
					y: [
						quote.open[index],
						quote.high[index],
						quote.low[index],
						quote.close[index],
					].map(round),
				}));
				setSeries([
					{
						data: prices,
					},
				]);
			} catch (error) {
				//console.log(error);
			}
			timeoutId = setTimeout(getLatestPrice, 50000000000 * 2);
		}

		getLatestPrice();

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div className="d-inline-flex p-4 bd-highlight">
			<div className="card shadow p-3 mb-5 bg-body rounded">
				<div className="card-body">
					<h5>Aktien US-Gas Preis (RB=F)/Gallon</h5>
					<p>
						Closed-/Record Time: {priceTime && priceTime.toLocaleTimeString()}
					</p>
					<p>PreviousClose: ${prevPrice}</p>
					<p>
						<b>Actual Price: ${price}</b>
					</p>
				</div>
			</div>
		</div>
	);
}
export default GasBrentPrices;
