var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit : 10,
	host : "classmysql.engr.oregonstate.edu",		
	user : "cs290_harrisk4",
	password : "2345", 
	database : "cs290_harrisk4"
});

module.exports.pool = pool;