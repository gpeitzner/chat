var express = require("express");
var router = express.Router();
var axios = require("axios");

const USERS_MOCK = require("../data/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.json(USERS_MOCK);
});

/** Login */
router.post("/", function (req, res, next) {
	const { nickname, password } = req.body;
	const found = USERS_MOCK.find(
		(user) => user.nickname === nickname && user.password === password
	);
	if (found) return res.json(found);
	return res.status(400).json({ message: "bad credentials" });
});

router.post("/test", function (req, res, next) {
	const { country, date, type } = req.body;
	
});

function generateReport() {
	return new Promise((resolve, reject) => {
		axios.get("https://narek-t.github.io/covid19/timeseries_global.json").then(
			(response) => {
				resolve(response.data);
			},
			(error) => {
				reject(error);
			}
		);
	});
}

module.exports = router;
