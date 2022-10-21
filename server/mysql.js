const mysql = require('mysql')

const client = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '******',
	database: 'goods'
})

function sqlFun(sql, arr, callback) {
	client.query(sql, arr, function(error, result) {
		if (error) {
			console.log('Error');
			return;
		}
		callback(result)
	})
}

module.exports = sqlFun