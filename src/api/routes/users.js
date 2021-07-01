var express = require("express");
var router = express.Router();

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

module.exports = router;
