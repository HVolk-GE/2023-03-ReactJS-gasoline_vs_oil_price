import { useSelector } from "react-redux";

const ReadChartData = () => {
	let tmpPriceDateTime = [];
	let tmpOilPrice = [];
	let tmpGasolinePrice = [];
	let prices = useSelector((state) => state.dbdata);

	if (prices.length > 0) {
		prices = JSON.parse(prices);
	}

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

		tmpPriceDateTime.push(prices[i].created_at);
		tmpOilPrice.push(prices[i].oilprice);
		tmpGasolinePrice.push(prices[i].avgbenzin);
	}
	return ReadChartData;
};
