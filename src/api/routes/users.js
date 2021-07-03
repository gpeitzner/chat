var express = require("express");
var router = express.Router();
var axios = require("axios");
var connector = require("../db/connector");

const USERS_MOCK = require("../data/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.json(USERS_MOCK);
});

/** Login */
router.post("/", async function (req, res, next) {
	const { nickname, password } = req.body;
	let users = await connector.run("SELECT * FROM USER_");
	const found = users.find(
		(user) => user.NICKNAME === nickname && user.PASSWORD === password
	);
	if (found)
		return res.json({
			name: found.NAME,
			nickname: found.NICKNAME,
			password: found.PASSWORD,
			bot: found.BOT === 0 ? false : true,
		});
	return res.status(400).json({ message: "bad credentials" });
});

router.post("/signup", async function (req, res, next) {
	const { name, nickname, password, bot } = req.body;
	try {
		let signup = await connector.run(
			`INSERT INTO USER_(NAME, NICKNAME, PASSWORD, BOT) VALUES (:0, :1, :2, :3)`,
			[name, nickname, password, bot]
		);
		if (signup === undefined) {
			let users = await connector.run("SELECT * FROM USER_");
			const found = users.find(
				(user) => user.NICKNAME === nickname && user.PASSWORD === password
			);
			if (found)
				return res.json({
					name: found.NAME,
					nickname: found.NICKNAME,
					password: found.PASSWORD,
					bot: found.BOT === 0 ? false : true,
				});
		} else {
			res.status(400).json({ message: "bad credentials" });
		}
	} catch (error) {
		res.status(400).json({ message: "bad credentials" });
	}
});

router.post("/test", function (req, res, next) {
	res.json({ message: "testing" });
});

module.exports = router;
