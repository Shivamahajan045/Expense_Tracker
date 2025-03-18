const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Shivu@123",
  database: "user",
});

module.exports = pool.promise();
