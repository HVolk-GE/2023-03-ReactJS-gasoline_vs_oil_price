import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: "*",
	})
);

app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
	// https://query1.finance.yahoo.com/v10/finance/quoteSummary/BZ=F?modules=price
	// im code als quelle eingeben:
	// http://localhost:8080/BZ=F?modules=price
	let endpoint =
		"https://query1.finance.yahoo.com/v10/finance/quoteSummary" +
		req.params.endpoint +
		"?modules=price";
	console.log(endpoint);

	axios
		.get(endpoint)
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

app.listen(8080, () => {
	console.log("Connect to Cors-Proxy on Port:8080");
});
