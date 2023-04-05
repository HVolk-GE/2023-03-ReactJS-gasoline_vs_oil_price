import "../index.css";
// useDispatch = Senden der Daten,
// useSelector = Den States holen,
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// function PriceHistroy() {
const PriceHistroy = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllPrices = async () => {
			try {
				await fetch("http://localhost:8800/priceshistroy")
					.then((res) => res.json())
					.then((data) =>
						dispatch({
							type: "ACTUAL_DBDATA",
							dbdata: JSON.stringify(data),
						})
					);
				// setPrices(res.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchAllPrices();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let prices = useSelector((state) => state.dbdata);

	if (prices.length > 0) {
		prices = JSON.parse(prices);
	}

	console.log("Prices inhalt: ", prices);

	// Datetime formater from response to readable format:
	for (let i = 0; i < prices.length; ++i) {
		let dateStr = prices[i].created_at,
			[yyyy, mm, dd, hh, mi] = dateStr.split(/[/:\-T]/);
		let hour = Number(hh);
		hour = hour + 2;
		hh = hour.toString();
		if (hh.length < 2) {
			hh = 0 + hh;
		}
		prices[i].created_at = `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
	}

	// Decimal Formatter
	const formatter = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 3,
	});

	return (
		<div>
			<h1>Oil prices vs Gasstation prices (History)</h1>
			<div class="container-fluid text-center">
				<div class="row row-cols-12">
					<div class="row justify-content-md-center">
						<div class="row row-cols-8">
							<div className="card shadow p-3 mb-5 bg-body rounded">
								<div className="prices">
									<table class="table table-striped">
										<thead>
											<tr>
												<th>Record Date/Time (CET)</th>
												<th>Oil-Price $/pro Barrel</th>
												<th>avg. Gasoline E10 Price €/l</th>
											</tr>
										</thead>
										<tbody>
											{prices.map((price) => (
												<tr className="price" key={price.id}>
													<td>{price.created_at}</td>
													<td>{formatter.format(price.oilprice)}</td>
													<td>{formatter.format(price.avgbenzin)}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceHistroy;
