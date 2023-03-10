import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
	host: "{your hostname or ip-address}",
	user: "{username}",
	password: "{userpassword}",
	database: "{databasename}",
});

// Middleware cors error and json
app.use(cors());
app.use(express.json());

// Read Connection intformation:
app.get("/", (req, res) => {
	res.json("Hello this is the backend !");
});

// Read DB from tabel:
app.get("/priceshistroy", (req, res) => {
	const q = "SELECT * FROM benzinvsoilprices";
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

// Data send from body:
app.post("/benzinvsoilprices", (req, res) => {
	// 		latit: formatter.format(latit),	lognit: formatter.format(lognit),
	const q =
		"INSERT INTO benzinvsoilprices(`avgbenzin`, `oilprice`, `eurusd`, `latit`, `lognit`) VALUES (?)";
	const values = [
		req.body.avgbenzin,
		req.body.oilprice,
		req.body.eurusd,
		req.body.latit,
		req.body.lognit,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json("Prices are saved successfully!");
	});
});

app.listen(8800, () => {
	console.log("Connect to backend on Port:8800");
});
