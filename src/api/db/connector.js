const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "admin"; // set mypw to the hr schema password
oracledb.initOracleClient({
	libDir:
		"D:\\instantclient-basic-windows.x64-19.11.0.0.0dbru\\instantclient_19_11",
});

async function run(query, params) {
	let connection;
	let response;
	try {
		connection = await oracledb.getConnection({
			user: "admin",
			password: mypw,
			connectString: "localhost/ORCL18",
		});
		let result;
		if (params) {
			result = await connection.execute(query, params, {
				autoCommit: true,
			});
		} else {
			result = await connection.execute(query);
		}
		//console.log(result.rows);
		response = result.rows;
	} catch (err) {
		console.error(err);
		response = err;
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				console.error(err);
				response = err;
			}
		}
		return response;
	}
}

module.exports = { run };
