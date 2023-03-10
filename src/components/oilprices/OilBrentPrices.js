import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

// API Call for OIL-Brent price
async function getStonks() {
	let apiResponse;
	await axios
		.get("http://localhost:8080/BZ=F?modules=price")
		.then((response) => {
			apiResponse = response.data;
		})
		.catch((error) => {
			apiResponse = error;
		});
	return apiResponse;
}

// API Call for EUR - USD
async function getStonksEurUsd() {
	let apiResponse;
	await axios
		.get("http://localhost:8080/EURUSD=X")
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

// Read API response and save results.
function OilBrentPrices() {
	const dispatch = useDispatch();
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
				// Read the response-data from the OIL-Brent-API and save inside redux:
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
	// Save OIL Brent price inside redux:
	dispatch({
		type: "ACTUAL_BREND_PRICE",
		actualbrendprice: price,
	});

	useEffect(() => {
		let timeoutIdEur;
		async function getLatestEurUsStock() {
			try {
				// Read the response-data from the EUR USD - API
				const eurData = await getStonksEurUsd();
				const eurusd = eurData.quoteSummary.result[0];
				localStorage.setItem(
					"EURUS",
					eurusd.price.regularMarketPrice.raw.toFixed(4)
				);
			} catch (error) {
				console.log(error);
			}
			timeoutIdEur = setTimeout(getLatestEurUsStock, 50000000000 * 2);
		}
		getLatestEurUsStock();
		return () => {
			clearTimeout(timeoutIdEur);
		};
	}, []);
	// Save EUR USD inside localstorage before get inside redux:
	let savedeurUsd = localStorage.getItem("EURUS");

	return (
		<div className="d-inline-flex p-4 bd-highlight">
			<div className="card shadow p-3 mb-5 bg-body rounded">
				<div className="card-body">
					<h5>Aktien US-Oil Preis (BZ=F)/Barell</h5>
					<p>
						Closed-/Record Time: {priceTime && priceTime.toLocaleTimeString()}
					</p>
					<p>PreviousClose: $ {prevPrice}</p>
					<p>
						<b>Actual Price: $ {price}</b>
					</p>
					<p>
						<small>€ {savedeurUsd} in $ </small>
					</p>
				</div>
			</div>
		</div>
	);
}
export default OilBrentPrices;
