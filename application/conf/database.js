const mysql = require('mysql2');
const pool = mysql.createPool({
    //Cnnnection information
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'csc317db',
    queueLimit: 0,
    connectionLimit: 20,
    waitForConnections: true
});

const promisePool = pool.promise();
module.exports = promisePool;