// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Shivu@123",
//   database: "user",
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("user", "root", "Shivu@123", {
  dialect: "mysql",
  host: "localhost",
  // logging: false,
});

module.exports = sequelize;
