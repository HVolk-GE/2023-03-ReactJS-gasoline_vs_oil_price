import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const API_KEY = process.env.REACT_APP_TANKKOENIG_API_KEY;
let latit = process.env.REACT_APP_LATITUTE;
let lognit = process.env.REACT_APP_LONGITUTE;
let benzType = "e10";

localStorage.setItem("Länge", latit);
localStorage.setItem("Breite", lognit);
// Set a Default URL, if current position blocked by browser:
// Setting your latitude and longitude in a .env file stored in the frontend root folder (see above)!
let url =
	"https://creativecommons.tankerkoenig.de/json/list.php?lat=" +
	latit +
	"&lng=" +
	lognit +
	"&rad=4&sort=price&type=" +
	benzType +
	"&apikey=" +
	API_KEY;

let istGeoeffnet = "";

function showPosition(position) {
	// Try to set new position, when is possible by browser:
	try {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, onGeoError);
		} else {
			alert("Please check your permissions");
		}
		latit = position.coords.latitude;
		lognit = position.coords.longitude;
	} catch (error) {
		// If not possible (browser are blockedn this), you will use a "standard" position!
		localStorage.setItem("Länge", latit);
		localStorage.setItem("Breite", lognit);
		url =
			"https://creativecommons.tankerkoenig.de/json/list.php?lat=" +
			latit +
			"&lng=" +
			lognit +
			"&rad=4&sort=price&type=" +
			benzType +
			"&apikey=" +
			API_KEY;
	}
	// eslint-disable-next-line no-sequences
	return url;
}

// Error
function onGeoError(position) {
	alert("Error code " + position.code + ". " + position.message);
}

function ReadTankPrices() {
	const dispatch = useDispatch();
	const axios = require("axios");

	useEffect(() => {
		let timeoutId;

		async function getLocationFromBrowser() {
			try {
				navigator.geolocation.getCurrentPosition(showPosition);
				fetch(url)
					.then((res) => res.json())
					.then((data) =>
						dispatch({
							type: "WHOLE_TANKPRICES_DATA",
							wholedatas: JSON.stringify(data.stations),
						})
					)
					.catch(console.error);
			} catch (e) {
				console.log(e);
			}
		}

		timeoutId = setTimeout(getLocationFromBrowser, 50000000000 * 2);

		getLocationFromBrowser();

		return () => {
			clearTimeout(timeoutId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	dispatch({
		type: "ACTUAL_LATIT",
		actlatit: localStorage.getItem("Länge"),
	});
	dispatch({
		type: "ACTUAL_LOGNIT",
		actlognit: localStorage.getItem("Breite"),
	});

	let datas = useSelector((state) => state.wholedatas);

	// Number decimal formatter:
	const formatter = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 3,
	});

	let cntTankstellePrices = 0;

	if (datas.length > 0) {
		datas = JSON.parse(datas);
		datas.forEach((data) => {
			cntTankstellePrices = cntTankstellePrices + data.price;
		});
	}

	cntTankstellePrices = cntTankstellePrices / datas.length;
	cntTankstellePrices = formatter.format(cntTankstellePrices);

	latit = useSelector((state) => state.actlatit);
	lognit = useSelector((state) => state.actlognit);

	dispatch({
		type: "AVERAGE_GASSTATION_PRICE",
		averagegasstation: cntTankstellePrices,
	});

	let brendOilPrice = useSelector((state) => state.actualbrendprice);

	let eurusd = localStorage.getItem("EURUS");

	let dbPrice = {
		oilprice: formatter.format(brendOilPrice),
		avgbenzin: formatter.format(cntTankstellePrices),
		eurusd: formatter.format(eurusd),
		latit: latit,
		lognit: lognit,
	};

	dispatch({
		type: "ACTUAL_DBDATA",
		dbdata: JSON.stringify(dbPrice),
	});

	const Add = async (e) => {
		console.log("Inhalt von dbPrice :", dbPrice);
		try {
			await axios.post("http://localhost:8800/benzinvsoilprices", dbPrice);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<div className="d-inline-flex p-4 bd-highlight">
				<div className="card shadow p-3 mb-5 bg-body rounded">
					<div className="card-body">
						<h4>Location:</h4>
						<h5>
							Längengrad: {latit} <br></br> Breitengrad: {lognit}
						</h5>
					</div>
				</div>
			</div>
			<div className="d-inline-flex p-4 bd-highlight">
				<div className="card shadow p-3 mb-5 bg-body rounded">
					<div className="card-body">
						<h4>Region: </h4>
						<h5>
							Durchschnittspreis ({benzType}) : {cntTankstellePrices} €{" "}
						</h5>
					</div>
				</div>
			</div>
			<div>
				<button
					type="button"
					class="btn btn-info waves-effect waves-light"
					onClick={Add}
				>
					Save
				</button>
			</div>
			<p></p>
			<h2>Tankstellen in Ihrer Nähe, auf den der Durchschnittspreis beruht:</h2>
			<p></p>
			{datas.map((tankprice) => {
				if (tankprice.isOpen) {
					istGeoeffnet = "geöffnet";
				} else {
					istGeoeffnet = "geschlossen";
				}

				return (
					<div key={tankprice.id} className="d-inline-flex p-4 bd-highlight">
						<div className="card shadow p-3 mb-5 bg-body rounded">
							<h4>{tankprice.name}</h4>
							<div className="card-body">
								<h5>Tankstellen Information:</h5>
								<p>Brand: {tankprice.brand}</p>
								<p>Street: {tankprice.street}</p>
								<div>City: {tankprice.place}</div>
								<p>Postcode: {tankprice.postCode}</p>
								<p>Entfernung: {tankprice.dist} km</p>
								<p>
									<b>Price: {tankprice.price} €</b>
								</p>
								<p>Geöffnet: {istGeoeffnet}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ReadTankPrices;
