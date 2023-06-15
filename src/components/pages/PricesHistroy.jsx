import "../../index.css";
// useDispatch = Senden der Daten,
// useSelector = Den States holen,
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";

const customStyles = {
	headRow: {
		style: {
			backgroundColor: "blue",
			color: "white",
			}
		},
		headCells: {
			fontSize: "16px",
			fontWeight: "600",
	},
	cells: {
		fontSize: "15px",
		
		}
}

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

	const columns = [
		{
			name: 'ID',
			selector: row => row.id,
			sortable: true,
	},
    {
        name: 'Record Date/Time (CET)',
			selector: row => row.created_at,
			sortable: true,
    },
    {
        name: 'Oil-Price $/pro Barrel',
				selector: row => formatter.format(row.oilprice),
		},
		{
			name: 'avg. Gasoline E10 Price €/l',
			selector: row => formatter.format(row.avgbenzin),
	},
];

	return (
		<div>
			<h1>Oil prices vs Gasstation prices (History)</h1>
			<div style={{padding: "50px 10%", backgroundColor: "gray"}}>
			<DataTable
				columns={columns}
					data={prices}
					customStyles={customStyles}
					pagination
				>
				</DataTable>
				</div>
		</div>
	);
};

export default PriceHistroy;
